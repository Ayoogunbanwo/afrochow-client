"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useCart } from "@/app/context/Cartcontext"
import Header from "@/components/restauarant_Navbar"
import { useUserContext } from "@/app/context/Usercontext"
import { ItemDetailsCard } from "@/components/ItemDetailsCard"
import { CartSummary } from "@/components/CartSummary"
import { ToastNotification } from "@/components/ToastNotification"

const ItemDetails = () => {
  const { storeId, itemId } = useParams()
  const { addToCart, removeFromCart, updateCartItemQuantity, summary, clearCart } = useCart()
  const { testData } = useUserContext()
  const { cart, setCart } = useCart()

  const [item, setItem] = useState(null)
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(1)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      if (!storeId || !itemId || !testData) {
        console.error("Missing storeId, itemId, or testData")
        setLoading(false)
        setIsLoading(false)
        return
      }

      const numericStoreId = Number(storeId)
      const numericItemId = Number(itemId)

      const foundRestaurant = testData.find((store) => store.storeId === numericStoreId)
      if (!foundRestaurant) {
        console.error(`Restaurant with storeId ${numericStoreId} not found`)
        setLoading(false)
        setIsLoading(false)
        return
      }

      const foundItem = foundRestaurant.popularItems.find((item) => item.itemid === numericItemId)
      if (!foundItem) {
        console.error(`Item with itemId ${numericItemId} not found`)
        setLoading(false)
        setIsLoading(false)
        return
      }

      setRestaurant(foundRestaurant)
      setItem(foundItem)
      setLoading(false)
      setIsLoading(false)
    }

    if (testData) {
      fetchData()
    }
  }, [storeId, itemId, testData])

  const handleAddToCart = async (quantity) => {
    if (item) {
      setIsSubmitting(true)
      try {
        if (cart.length > 0 && cart[0].storeId !== storeId) {
          if (
            window.confirm("Adding items from a different store will clear your current cart. Do you want to proceed?")
          ) {
            clearCart()
          } else {
            setIsSubmitting(false)
            return
          }
        }

        const existingItemIndex = cart.findIndex((cartItem) => cartItem.itemid === item.itemid)

        if (existingItemIndex !== -1) {
          const updatedCart = [...cart]
          updatedCart[existingItemIndex].quantity += quantity
          setCart(updatedCart)
        } else {
          const itemToAdd = {
            ...item,
            quantity: quantity,
            price: Number(item.price),
            deleiverytime: item.deliveryTime,
            storeId: storeId,
          }
          addToCart(itemToAdd, quantity)
        }

        setIsAddedToCart(true)
        setShowToast(true)
        setCount(1) // Reset count to 1 after adding to cart

        setTimeout(() => {
          setShowToast(false)
          setIsAddedToCart(false) // Reset isAddedToCart after the toast disappears
        }, 3000)
      } catch (error) {
        console.error("Error when adding item to cart:", error)
        if (error.response) {
          console.error("Error Response:", error.response)
          setErrors({ submit: "Failed to add item to cart. Server error. Please try again." })
        } else if (error.request) {
          console.error("Error Request:", error.request)
          setErrors({ submit: "Network error. Please try again." })
        } else {
          console.error("General Error:", error.message)
          setErrors({ submit: "An unexpected error occurred. Please try again." })
        }
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleUpdateCartItemQuantity = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(itemId, newQuantity)
    } else {
      removeFromCart(itemId)
    }
  }

  if (loading || !testData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Loading...</h2>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Fetching item details...</h2>
        </div>
      </div>
    )
  }

  if (!item || !restaurant) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Item or restaurant not found</h2>
          <p className="mt-2 text-gray-600">
            StoreId: {storeId || "N/A"}, ItemId: {itemId || "N/A"}
          </p>
          <Link href="/" className="mt-4 text-blue-600 hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header name={restaurant.name} logo={restaurant.logo} description={restaurant.description} />

      <div className="container px-4 py-8 mx-auto">
        <Link
          href={`/restaurant/store/${restaurant.storeId}`}
          className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2 text-black" />
          Back to {restaurant.name}
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[60%_40%]">
          <ItemDetailsCard
            item={item}
            restaurant={restaurant}
            count={count}
            setCount={setCount}
            handleAddToCart={handleAddToCart}
            isSubmitting={isSubmitting}
            isAddedToCart={isAddedToCart}
            errors={errors}
          />

          <CartSummary
            cart={cart}
            storeId={storeId}
            restaurant={restaurant}
            removeFromCart={removeFromCart}
            handleUpdateCartItemQuantity={handleUpdateCartItemQuantity}
          />
        </div>
      </div>

      <ToastNotification showToast={showToast} item={item} />
    </div>
  )
}

export default ItemDetails

