import Image from "next/image"
import { Button } from "@/components/ui/button" // Corrected import path
import { Clock, MapPin, Phone, Plus, Minus, Truck } from "lucide-react"

export function ItemDetailsCard({
  item,
  restaurant,
  count,
  setCount,
  handleAddToCart,
  isSubmitting,
  isAddedToCart,
  errors,
}) {
  const handleIncrement = () => setCount((prevCount) => Math.min(prevCount + 1, 10))
  const handleDecrement = () => setCount((prevCount) => Math.max(prevCount - 1, 1))

  const itemPrice = Number(item.price) || 0
  const totalPrice = (itemPrice * count).toFixed(2)

  const onAddToCart = async () => {
    await handleAddToCart(count)
  }

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-lg">
      <div className="relative h-64 sm:h-80 md:h-96">
        <Image
          src={item.imageUrl?.startsWith("http") ? item.imageUrl : "/placeholder.svg"}
          alt={item.name || "Item Image"}
          fill
          className="object-cover"
          onLoad={() => console.log('Image loaded')}  // Replace onLoadingComplete with onLoad
        />
      </div>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{item.name}</h1>
            <p className="mt-2 text-gray-500">{item.description || "No description available"}</p>
          </div>
          <div className="mt-4 text-xl font-semibold text-black sm:mt-0">
            ${itemPrice.toFixed(2)}
            <span className="ml-2 text-base text-gray-500">min</span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="mb-4 text-lg font-semibold">Quantity</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={handleDecrement} variant="outline" size="icon" disabled={count <= 1}>
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center">{count}</span>
            <Button onClick={handleIncrement} variant="outline" size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-200">
          <h2 className="mb-4 text-xl font-semibold">Restaurant Information</h2>
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>
                Opens: {restaurant.openingTime || "N/A"} - Closes: {restaurant.closingTime || "N/A"}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{restaurant.location || "Location not available"}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="w-5 h-5 mr-2" />
              <span>{restaurant.phone || "No contact info"}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Truck className="w-5 h-5 mr-2" />
              <span>Delivery Fee: ${restaurant.deliveryFee?.toFixed(2) || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="p-4 mb-4 rounded-lg bg-gray-50">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal ({count} items)</span>
              <span className="font-semibold">${totalPrice}</span>
            </div>
            <div className="flex justify-between pt-2 mt-2 border-t border-gray-200">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${totalPrice}</span>
            </div>
          </div>

          <Button
            className={`w-full py-4 text-lg font-semibold text-white transition-colors ${isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : isAddedToCart
                ? "bg-green-600 hover:bg-green-700"
                : "bg-orange-500 hover:bg-orange-600"}`}
            onClick={onAddToCart}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Adding to Cart...
              </span>
            ) : isAddedToCart ? (
              "Added to Cart ✓"
            ) : (
              `Add to Cart - $${totalPrice}`
            )}
          </Button>
          {errors.submit && <p className="mt-2 text-sm text-center text-red-500">{errors.submit}</p>}
        </div>
      </div>
    </div>
  )
}
