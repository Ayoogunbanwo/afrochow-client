"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  const [promoCode, setPromoCode] = useState(null); // For promo code
  const maxQuantity = 10; // Maximum limit per item

  // Sync cart across tabs using the storage event
  useEffect(() => {
    const handleStorageChange = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Save cart to local storage with debouncing
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, 1000); // Save after 1 second delay

    return () => clearTimeout(timeout);
  }, [cart]);

  // Summary calculation with promo code
  const summary = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
    const gst = subtotal * 0.05;
    const pst = subtotal * 0.06;
    const serviceFee = subtotal * 0.005;
    const discount = promoCode ? subtotal * 0.1 : 0;
    const total = subtotal + gst + pst + serviceFee - discount;

    // Ensure values are numbers and handle NaN
    return {
      subtotal: !isNaN(subtotal) ? subtotal : 0,
      gst: !isNaN(gst) ? gst : 0,
      pst: !isNaN(pst) ? pst : 0,
      serviceFee: !isNaN(serviceFee) ? serviceFee : 0,
      discount: !isNaN(discount) ? discount : 0,
      total: !isNaN(total) ? total : 0,
    };
  }, [cart, promoCode]);

  const addToCart = (item) => {
    if (item.quantity <= 0 || !item.price) return; // Prevent invalid quantities or missing prices

    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.itemid === item.itemid);

      if (existingItem) {
        const newQuantity = existingItem.quantity + item.quantity;
        if (newQuantity <= maxQuantity) {
          return prevCart.map((cartItem) =>
            cartItem.itemid === item.itemid
              ? { ...cartItem, quantity: newQuantity }
              : cartItem
          );
        }
      } else {
        return [...prevCart, { ...item }];
      }

      return prevCart; // No update if exceeding max quantity
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.itemid !== itemId));
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) return removeFromCart(itemId); // Remove if quantity is zero or less

    if (newQuantity > maxQuantity) return; // Prevent exceeding max quantity

    setCart((prevCart) =>
      prevCart.map((item) => (item.itemid === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const applyPromoCode = (code) => {
    if (code === "DISCOUNT10") {
      setPromoCode(code);
    } else {
      setPromoCode(null); // Invalid code, reset promo
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        summary,
        applyPromoCode, // Expose the promo code functionality
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
