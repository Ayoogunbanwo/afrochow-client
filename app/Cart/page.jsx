"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useCart } from "@/app/context/Cartcontext"
import { useUserContext } from "@/app/context/Usercontext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft, Package, Truck, CreditCard } from "lucide-react"
import PickupSelector from "@/components/Pickupselector"

const provinces = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "YT", name: "Yukon" },
]

const CartPage = () => {
  const { cart, removeFromCart, updateCartItemQuantity, summary } = useCart()
  const { deliveryFee, filterByStoreId, deliverytime } = useUserContext()

  const [mounted, setMounted] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [deliveryOption, setDeliveryOption] = useState("pickup")
  const [pickupDetails, setPickupDetails] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [deliveryData, setDeliveryData] = useState({
    street: "",
    city: "",
    province: "",
    postalCode: "",
    instructions: "",
    phoneNumber: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (cart.length > 0) {
      filterByStoreId(cart[0]?.storeId)
    }
  }, [cart, filterByStoreId])

  useEffect(() => {
    if (deliveryOption !== "pickup") {
      setPickupDetails(null)
    }
  }, [deliveryOption])

  const handleQuantityUpdate = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      await handleRemoveItem(itemId)
      return
    }
    setIsUpdating(true)
    try {
      await updateCartItemQuantity(itemId, newQuantity)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemoveItem = async (itemId) => {
    setIsUpdating(true)
    try {
      await removeFromCart(itemId)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCheckout = async () => {
    setIsProcessing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsProcessing(false)
    // Handle checkout logic here
  }

  const handleDeliveryDataChange = (e) => {
    const { name, value } = e.target
    setDeliveryData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePostalCodeChange = (e) => {
    const cleaned = e.target.value.replace(/[^\w]/g, "").toUpperCase()
    const formatted = cleaned.length > 3 ? `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)}` : cleaned
    setDeliveryData((prev) => ({ ...prev, postalCode: formatted }))
  }

  const handlePickupScheduled = (date, time) => {
    setPickupDetails({ date, time })
  }

  if (!mounted) return null

  const deliveryFeeAdjusted = deliveryOption === "delivery" ? deliveryFee : 0
  const total = Number(summary?.total || 0) + deliveryFeeAdjusted

  const isCheckoutDisabled =
    cart.length === 0 ||
    (deliveryOption === "pickup" && !pickupDetails) ||
    (deliveryOption === "delivery" &&
      (!deliveryData.street ||
        !deliveryData.city ||
        !deliveryData.province ||
        !deliveryData.postalCode ||
        !deliveryData.phoneNumber))

  const renderCartItems = () => (
    <div className="space-y-6">
      {cart.map((item) => (
        <div
          key={item.itemid}
          className="flex flex-col justify-between p-5 transition-all duration-200 border border-gray-200 rounded-xl sm:flex-row sm:items-center hover:shadow-md"
        >
          <div className="mb-3 sm:mb-0">
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
            <p className="font-medium text-black">${Number(item.price).toFixed(2)}</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center p-1 bg-gray-100 rounded-lg">
              <Button
                onClick={() => handleQuantityUpdate(item.itemid, item.quantity - 1)}
                variant="ghost"
                size="icon"
                className="transition-colors hover:bg-gray-200"
                disabled={isUpdating || item.quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 font-medium text-center">{item.quantity}</span>
              <Button
                onClick={() => handleQuantityUpdate(item.itemid, item.quantity + 1)}
                variant="ghost"
                size="icon"
                className="transition-colors hover:bg-gray-200"
                disabled={isUpdating || item.quantity >= 10}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <Button
              onClick={() => handleRemoveItem(item.itemid)}
              variant="ghost"
              size="icon"
              className="ml-2 text-red-500 transition-colors hover:bg-red-50"
              disabled={isUpdating}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )

  const renderDeliveryForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="street">Street Address</Label>
          <input
            id="street"
            name="street"
            value={deliveryData.street}
            onChange={handleDeliveryDataChange}
            placeholder="Enter street address"
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors bg-orange-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <input
            id="city"
            name="city"
            value={deliveryData.city}
            onChange={handleDeliveryDataChange}
            placeholder="Enter city"
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors bg-orange-50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="province">Province</Label>
          <select
            id="province"
            name="province"
            value={deliveryData.province}
            onChange={handleDeliveryDataChange}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors bg-orange-50"
          >
            <option value="">Select Province</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <input
            id="postalCode"
            name="postalCode"
            value={deliveryData.postalCode}
            onChange={handlePostalCodeChange}
            placeholder="Enter postal code"
            maxLength={7}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors bg-orange-50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          value={deliveryData.phoneNumber}
          onChange={handleDeliveryDataChange}
          placeholder="Enter phone number"
          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors bg-orange-50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
        <textarea
          id="instructions"
          name="instructions"
          value={deliveryData.instructions}
          onChange={handleDeliveryDataChange}
          placeholder="Add any special delivery instructions..."
          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors bg-orange-50"
          rows={3}
        />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      <div className="container max-w-4xl px-4 py-8 mx-auto">
        <div className="flex items-center mb-6 space-x-2">
          <Link href="/store" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to Store
          </Link>
        </div>

        <Card className="overflow-hidden bg-white shadow-xl rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center mb-6 space-x-2">
              <ShoppingBag className="w-6 h-6 text-orange-500" />
              <h3 className="text-2xl font-semibold text-gray-800">Your Cart</h3>
            </div>

            {cart.length > 0 ? (
              renderCartItems()
            ) : (
              <div className="p-8 text-center">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Your cart is empty.</p>
                <Link href="/store">
                  <Button className="mt-4">Continue Shopping</Button>
                </Link>
              </div>
            )}

            {cart.length > 0 && (
              <>
                <div className="p-6 mt-8 space-y-6 bg-orange-50 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Package className="w-6 h-6 text-orange-500" />
                    <h3 className="text-xl font-semibold text-gray-800">Delivery Options</h3>
                    <div>
                      <span className="text-sm text-gray-500">Please select a delivery option</span>
                    </div>
                  </div>

                  <RadioGroup
                    value={deliveryOption}
                    onValueChange={setDeliveryOption}
                    className="grid grid-cols-1 gap-4 md:grid-cols-2"
                  >
                    <div>
                      <RadioGroupItem value="pickup" id="pickup" className="sr-only peer" />
                      <Label
                        htmlFor="pickup"
                        className={`flex flex-col items-center justify-between p-4 text-center border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-orange-200 peer-checked:border-orange-500 peer-checked:bg-orange-100 ${deliveryOption === "pickup" ? "bg-orange-100 shadow-md" : "bg-white"}`}
                      >
                        <Package className="w-6 h-6 mb-2 text-orange-500" />
                        <div className="font-semibold">Pickup</div>
                        <PickupSelector onScheduled={handlePickupScheduled} />
                        {pickupDetails && (
                          <p className="mt-2 text-sm text-green-600">
                            ✓ Pickup scheduled for {pickupDetails.date} at {pickupDetails.time}
                          </p>
                        )}
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem value="delivery" id="delivery" className="sr-only peer" />
                      <Label
                        htmlFor="delivery"
                        className={`flex flex-col items-center justify-between p-4 text-center border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-orange-200 peer-checked:border-orange-500 peer-checked:bg-orange-100 ${deliveryOption === "delivery" ? "bg-orange-100 shadow-md" : "bg-white"}`}
                      >
                        <Truck className="w-6 h-6 mb-2 text-orange-500" />
                        <div className="font-semibold">Delivery</div>
                        {renderDeliveryForm()}
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="p-4 space-y-3 bg-white rounded-lg">
                    <div className="flex justify-between text-lg text-gray-800">
                      <span>Subtotal</span>
                      <span className="font-semibold">${Number(summary?.total || 0).toFixed(2)}</span>
                    </div>
                    {deliveryFeeAdjusted > 0 && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Delivery Fee</span>
                        <span>${deliveryFeeAdjusted.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-3 text-lg font-bold text-black border-t">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={isCheckoutDisabled || isProcessing}
                    className="w-full py-6 mt-6 text-lg font-semibold transition-all duration-200 bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        <span>Proceed to Checkout</span>
                      </>
                    )}
                  </Button>

                  {isCheckoutDisabled && (
                    <div className="p-3 mt-2 text-sm text-amber-800 bg-amber-50 rounded-lg">
                      {!pickupDetails && deliveryOption === "pickup"
                        ? "Please select a pickup time to continue"
                        : deliveryOption === "delivery"
                          ? "Please fill in all required delivery information to continue"
                          : "Please add items to your cart to continue"}
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CartPage

