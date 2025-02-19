'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit2, Check, X, Truck, Store, DollarSign, Clock } from "lucide-react"

const StoreOperations = ({ data, updateData }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(data)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const operations = {
      deliveryFee: Number.parseFloat(formData.get("deliveryFee")),
      pickupAvailable: formData.get("pickupAvailable") === "true",
      deliveryAvailable: formData.get("deliveryAvailable") === "true",
      minimumOrder: Number.parseFloat(formData.get("minimumOrder")),
      maxDeliveryDistance: Number.parseFloat(formData.get("maxDeliveryDistance")),
      estimatedDeliveryTime: formData.get("estimatedDeliveryTime"),
      estimatedPickupTime: formData.get("estimatedPickupTime"),
      deliveryArea: formData.get("deliveryArea"),
    }
    updateData(operations)
    setFormData(operations)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(data)
    setIsEditing(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="border-b bg-orange-50">
        <CardTitle className="text-xl sm:text-2xl font-bold text-orange-700">Store Operations</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6 px-4 sm:px-0">
            <div className="grid gap-4">
              <Label>Delivery Fee ($)</Label>
              <Input name="deliveryFee" type="number" defaultValue={formData.deliveryFee} required />
              
              <Label>Minimum Order ($)</Label>
              <Input name="minimumOrder" type="number" defaultValue={formData.minimumOrder} required />
              
              <Label>Max Delivery Distance (km)</Label>
              <Input name="maxDeliveryDistance" type="number" defaultValue={formData.maxDeliveryDistance} required />
              
              <Label>Estimated Delivery Time</Label>
              <Input name="estimatedDeliveryTime" type="text" defaultValue={formData.estimatedDeliveryTime} required />
              
              <Label>Estimated Pickup Time</Label>
              <Input name="estimatedPickupTime" type="text" defaultValue={formData.estimatedPickupTime} required />
              
              <Label>Delivery Area</Label>
              <Input name="deliveryArea" type="text" defaultValue={formData.deliveryArea} required />
              
              <div className="flex items-center space-x-2">
                <Switch name="pickupAvailable" defaultChecked={formData.pickupAvailable} />
                <Label>Pickup Available</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch name="deliveryAvailable" defaultChecked={formData.deliveryAvailable} />
                <Label>Delivery Available</Label>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white transition-colors">
                <Check className="w-4 h-4 mr-2" /> Save Operations
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50">
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 px-4 sm:px-0">
            <p className="flex items-center text-gray-700"><DollarSign className="w-5 h-5 mr-2 text-orange-500" /> Delivery Fee: ${formData.deliveryFee}</p>
            <p className="flex items-center text-gray-700"><Store className="w-5 h-5 mr-2 text-orange-500" /> Minimum Order: ${formData.minimumOrder}</p>
            <p className="flex items-center text-gray-700"><Truck className="w-5 h-5 mr-2 text-orange-500" /> Max Delivery Distance: {formData.maxDeliveryDistance} km</p>
            <p className="flex items-center text-gray-700"><Clock className="w-5 h-5 mr-2 text-orange-500" /> Estimated Delivery Time: {formData.estimatedDeliveryTime}</p>
            <p className="flex items-center text-gray-700"><Clock className="w-5 h-5 mr-2 text-orange-500" /> Estimated Pickup Time: {formData.estimatedPickupTime}</p>
            <p className="flex items-center text-gray-700"><Truck className="w-5 h-5 mr-2 text-orange-500" /> Delivery Area: {formData.deliveryArea}</p>
            <p className="flex items-center text-gray-700"><span className="w-5 h-5 mr-2 text-orange-500">{formData.pickupAvailable ? "✅" : "❌"}</span> Pickup Available</p>
            <p className="flex items-center text-gray-700"><span className="w-5 h-5 mr-2 text-orange-500">{formData.deliveryAvailable ? "✅" : "❌"}</span> Delivery Available</p>
            <Button onClick={() => setIsEditing(true)} variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50">
              <Edit2 className="w-4 h-4 mr-2" /> Edit Operations
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default StoreOperations
