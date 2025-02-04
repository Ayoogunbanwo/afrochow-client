"use client";
import React, { useState } from "react";
import { useCart } from "@/app/context/Cartcontext";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, CreditCard, Home, MapPin, User, Trash2 } from "lucide-react";

const CheckoutPage = () => {
  const { cart, clearCart, updateQuantity, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Calculate totals dynamically based on the cart
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const hst = subtotal * 0.07; // 7% HST
  const gst = subtotal * 0.06; // 6% GST
  const serviceFee = subtotal * 0.005; // 0.5% Service Fee
  const total = subtotal + hst + gst + serviceFee;

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your payment processing logic here
    alert("Payment Successful!");
    clearCart();
  };

  // Handle quantity updates
  const handleQuantityChange = (itemid, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(itemid, newQuantity);
    } else {
      removeFromCart(itemid); // Remove item if quantity is set to 0
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-gray-800">Checkout</h1>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Order Summary */}
          <Card className="p-6">
            <CardContent>
              <h2 className="mb-6 text-2xl font-semibold text-gray-800">Order Summary</h2>
              <div className="space-y-4">
                {cart.length === 0 ? (
                  <p className="text-gray-600">Your cart is empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.itemid} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover w-16 h-16 rounded-lg"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-gray-600">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="0"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.itemid, parseInt(e.target.value))
                          }
                          className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => removeFromCart(item.itemid)}
                          className="text-red-500 hover:text-red-700"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">HST (7%)</span>
                  <span className="font-medium">${hst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (6%)</span>
                  <span className="font-medium">${gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee (0.5%)</span>
                  <span className="font-medium">${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-xl font-semibold">Total</span>
                  <span className="text-xl font-bold text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Details Form */}
          <Card className="p-6">
            <CardContent>
              <h2 className="mb-6 text-2xl font-semibold text-gray-800">Payment Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Address */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Shipping Address
                  </label>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                {/* City and Postal Code */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">City</label>
                    <div className="flex items-center space-x-3">
                      <Home className="w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Enter your city"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="Enter postal code"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                {/* Payment Details */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="Enter card number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                {/* Expiry Date and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="Enter CVV"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-white transition-colors duration-200 bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Confirm Payment
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;