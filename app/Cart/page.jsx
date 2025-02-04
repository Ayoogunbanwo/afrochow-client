"use client";

import { useCart } from "@/app/context/Cartcontext";
import { useUserContext } from "@/app/context/Usercontext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft, Package, Truck } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const CartPage = () => {
  const { cart, removeFromCart, updateCartItemQuantity, summary } = useCart();
  const { deliveryFee, filterByStoreId, deliverytime } = useUserContext();

  const [mounted, setMounted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [deliveryData, setDeliveryData] = useState({
    street: '',
    city: '',
    province: '',
    postalCode: '',
    instructions: '',
    phoneNumber: '',
  });

  const provinces = [
    { code: 'AB', name: 'Alberta' },
    { code: 'BC', name: 'British Columbia' },
    { code: 'MB', name: 'Manitoba' },
    { code: 'NB', name: 'New Brunswick' },
    { code: 'NL', name: 'Newfoundland and Labrador' },
    { code: 'NS', name: 'Nova Scotia' },
    { code: 'NT', name: 'Northwest Territories' },
    { code: 'NU', name: 'Nunavut' },
    { code: 'ON', name: 'Ontario' },
    { code: 'PE', name: 'Prince Edward Island' },
    { code: 'QC', name: 'Quebec' },
    { code: 'SK', name: 'Saskatchewan' },
    { code: 'YT', name: 'Yukon' }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      filterByStoreId(cart[0]?.storeId);
    }
  }, [cart, filterByStoreId]);

  const handleQuantityUpdate = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    setIsUpdating(true);
    try {
      await updateCartItemQuantity(itemId, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    setIsUpdating(true);
    try {
      await removeFromCart(itemId);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeliveryDataChange = (e) => {
    const { name, value } = e.target;
    setDeliveryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatPostalCode = (input) => {
    let cleaned = input.replace(/[^\w]/g, '').toUpperCase();
    if (cleaned.length > 3) {
      cleaned = cleaned.slice(0, 3) + ' ' + cleaned.slice(3, 6);
    }
    return cleaned;
  };

  const handlePostalCodeChange = (e) => {
    const formatted = formatPostalCode(e.target.value);
    setDeliveryData((prevData) => ({
      ...prevData,
      postalCode: formatted,
    }));
  };

  if (!mounted) {
    return null;
  }

  const deliveryFeeAdjusted = deliveryOption === 'pickup' ? 0 : deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl px-4 py-8 mx-auto">
        {cart.length > 0 && (
          <Link 
            href={`/restaurant/store/${cart[0]?.storeId}`} 
            className="inline-flex items-center mb-6 text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-lg">Continue Shopping</span>
          </Link>
        )}

        <Card className="overflow-hidden bg-white shadow-xl rounded-xl">
          <div className="p-6 bg-black">
            <h2 className="flex items-center mb-1 space-x-3 text-2xl font-bold text-white">
              <ShoppingBag className="w-7 h-7" />
              <span>Your Shopping Cart</span>
            </h2>
            <p className="ml-10 text-gray-300">Complete your order with ease</p>
          </div>
          
          <CardContent className="p-6">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-gray-300" />
                <p className="mb-6 text-xl text-gray-500">Your cart is empty</p>
                <Link href="/restaurant/store">
                  <Button variant="outline" className="px-8 py-2 text-lg transition-colors hover:bg-gray-50">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((cartItem) => (
                  <div 
                    key={cartItem.itemid} 
                    className="flex flex-col justify-between p-5 transition-all duration-200 border border-gray-200 rounded-xl sm:flex-row sm:items-center hover:bg-gray-50"
                  >
                    <div className="mb-3 sm:mb-0">
                      <h3 className="text-lg font-semibold text-gray-800">{cartItem.name}</h3>
                      <p className="font-medium text-black">${Number(cartItem.price).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        onClick={() => handleQuantityUpdate(cartItem.itemid, cartItem.quantity - 1)}
                        variant="outline"
                        size="icon"
                        className="transition-colors hover:bg-gray-100"
                        disabled={isUpdating || cartItem.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 font-medium text-center">{cartItem.quantity}</span>
                      <Button
                        onClick={() => handleQuantityUpdate(cartItem.itemid, cartItem.quantity + 1)}
                        variant="outline"
                        size="icon"
                        className="transition-colors hover:bg-gray-100"
                        disabled={isUpdating || cartItem.quantity >= 10}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleRemoveItem(cartItem.itemid)}
                        variant="outline"
                        size="icon"
                        className="ml-2 text-red-500 transition-colors hover:bg-red-50 hover:border-red-200"
                        disabled={isUpdating}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="p-6 mt-8 space-y-6 bg-gray-50 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800">Delivery Options</h3>
                  <RadioGroup
                    value={deliveryOption}
                    onValueChange={setDeliveryOption}
                    className="grid grid-cols-1 gap-4 md:grid-cols-2"
                  >
                    <div>
                      <RadioGroupItem
                        value="pickup"
                        id="pickup"
                        className="sr-only peer"
                      />
                      <Label
                        htmlFor="pickup"
                        className="flex flex-col items-center justify-between p-4 text-center border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 peer-checked:border-black peer-checked:bg-gray-50"
                      >
                        <Package className="w-6 h-6 mb-2" />
                        <div className="font-semibold">Pickup</div>
                        <span className="mt-2 text-sm text-center text-gray-500">{deliverytime} - {deliverytime + 10} Minutes</span>
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem
                        value="delivery"
                        id="delivery"
                        className="sr-only peer"
                      />
                      <Label
                        htmlFor="delivery"
                        className="flex flex-col items-center justify-between p-4 text-center border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 peer-checked:border-black peer-checked:bg-gray-50"
                      >
                        <Truck className="w-6 h-6 mb-2" />
                        <div className="font-semibold">Delivery</div>
                        <span className="mt-2 text-sm text-gray-500">${deliveryFee.toFixed(2)} fee</span>
                      </Label>
                    </div>
                  </RadioGroup>

                  {deliveryOption === 'delivery' && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="block mb-2 font-medium text-gray-700">Street Address</label>
                        <input 
                          type="text" 
                          name="street" 
                          value={deliveryData.street} 
                          onChange={handleDeliveryDataChange}
                          placeholder="Street number and name"
                          className="w-full p-3 transition-all border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black" 
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="block mb-2 font-medium text-gray-700">City</label>
                          <input 
                            type="text" 
                            name="city" 
                            value={deliveryData.city} 
                            onChange={handleDeliveryDataChange}
                            className="w-full p-3 transition-all border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black" 
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium text-gray-700">Province</label>
                          <select 
                            name="province" 
                            value={deliveryData.province}
                            onChange={handleDeliveryDataChange}
                            className="w-full p-3 transition-all border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                            required
                          >
                            <option value="">Select Province</option>
                            {provinces.map((province) => (
                              <option key={province.code} value={province.code}>
                                {province.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 font-medium text-gray-700">Postal Code</label>
                        <input 
                          type="text" 
                          name="postalCode" 
                          value={deliveryData.postalCode} 
                          onChange={handlePostalCodeChange}
                          placeholder="A1A 1A1"
                          maxLength="7"
                          className="w-full p-3 uppercase transition-all border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black" 
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-medium text-gray-700">Delivery Instructions</label>
                        <textarea 
                          name="instructions" 
                          value={deliveryData.instructions} 
                          onChange={handleDeliveryDataChange}
                          placeholder="Apartment number, gate code, or other special instructions"
                          className="w-full p-3 transition-all border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black" 
                          rows="2"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-medium text-gray-700">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phoneNumber" 
                          value={deliveryData.phoneNumber} 
                          onChange={handleDeliveryDataChange}
                          placeholder="(123) 456-7890"
                          className="w-full p-3 transition-all border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black" 
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 mt-6 space-y-4 border border-gray-200 rounded-xl bg-gray-50">
                  <h3 className="mb-4 text-xl font-semibold text-gray-800">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium">${summary.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>GST/HST (5%)</span>
                      <span className="font-medium">${summary.gst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>PST (6%)</span>
                      <span className="font-medium">${summary.pst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Service Fee (0.5%)</span>
                      <span className="font-medium">${summary.serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span className="font-medium">${deliveryFeeAdjusted.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-gray-200">
                      <span className="text-xl font-semibold text-gray-800">Total</span>
                      <span className="text-xl font-bold text-black">
                        ${(summary.total + deliveryFeeAdjusted).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Link href="/checkout">
                    <Button 
                      className="w-full text-lg font-semibold transition-colors bg-black h-14 hover:bg-gray-900" 
                      disabled={isUpdating}
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;