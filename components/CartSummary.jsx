import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, Plus, Minus, Trash2 } from "lucide-react"

export function CartSummary({ cart, storeId, restaurant, handleUpdateCartItemQuantity, removeFromCart }) {
  const currentStoreItems = cart.filter((item) => item.storeId === storeId)
  const subtotal = currentStoreItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const gst = subtotal * 0.05
  const pst = subtotal * 0.06
  const serviceFee = subtotal * 0.005
  const total = subtotal + pst + gst + serviceFee

  return (
    <Card className="overflow-hidden shadow-lg">
      <div className="p-6 bg-black">
        <h2 className="flex items-center mb-4 space-x-2 text-2xl font-semibold text-white">
          <ShoppingBag className="w-6 h-6" />
          <span>Cart</span>
        </h2>
        {restaurant && <p className="text-white">{restaurant.name}</p>}
      </div>
      <CardContent className="p-6">
        {currentStoreItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {currentStoreItems.map((cartItem) => (
              <div
                key={cartItem.itemid}
                className="flex items-center justify-between p-3 transition-colors border border-gray-100 rounded-lg hover:bg-gray-50"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{cartItem.name}</h3>
                  <p className="text-blue-600">
                    {cartItem.quantity} x ${Number(cartItem.price).toFixed(2)} = $
                    {(cartItem.quantity * cartItem.price).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => handleUpdateCartItemQuantity(cartItem.itemid, cartItem.quantity - 1)}
                    variant="outline"
                    size="icon"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center">{cartItem.quantity}</span>
                  <Button
                    onClick={() => handleUpdateCartItemQuantity(cartItem.itemid, cartItem.quantity + 1)}
                    variant="outline"
                    size="icon"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => removeFromCart(cartItem.itemid)}
                    variant="outline"
                    size="icon"
                    className="ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="p-4 mt-6 space-y-3 rounded-lg bg-gray-50">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST/HST (5%)</span>
                <span className="font-medium">${gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>PST (6%)</span>
                <span className="font-medium">${pst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Service Fee (0.5%)</span>
                <span className="font-medium">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="text-xl font-semibold text-gray-800">Total</span>
                <span className="text-xl font-bold text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4">
              <Link href={`/Cart?storeId=${storeId}`}>
                <Button className="w-full">Cart Summary</Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

