import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Image, DollarSign, Clock, Trash2, Edit2, Check, X } from "lucide-react"
import ImagePreview from "@/components/ImagePreview"

const StoreItems = ({ onAddItem, items = [], onUpdateItem, onDeleteItem }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    isPopular: false,
    deliveryTime: "",
    category: "",
    inStock: true,
    tags: [],
    nutritionInfo: "",
    allergens: "",
  })

  const categories = ["Main Dishes", "Appetizers", "Desserts", "Beverages", "Specials", "Sides", ]

  const handleAddItem = () => {
    if (newItem.name && newItem.price) {
      onAddItem({ ...newItem, id: Date.now() })
      resetForm()
    }
  }

  const resetForm = () => {
    setNewItem({
      name: "",
      description: "",
      price: "",
      image: null,
      isPopular: false,
      deliveryTime: "",
      category: "",
      inStock: true,
      tags: [],
      nutritionInfo: "",
      allergens: "",
    })
    setImagePreview(null)
    setIsAdding(false)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setNewItem({ ...newItem, image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const ItemForm = ({ item = newItem, onSubmit, onCancel }) => (
    <div className="space-y-6 p-4 bg-orange-50 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
          <div>
            <Label htmlFor="itemName">Item Name</Label>
            <Input
              id="itemName"
              value={item.name}
              onChange={(e) => setNewItem({ ...item, name: e.target.value })}
              className="mt-1"
              placeholder="Enter item name"
            />
          </div>

          <div>
            <Label htmlFor="itemCategory">Category</Label>
            <Select value={item.category} onValueChange={(value) => setNewItem({ ...item, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="itemPrice">Price ($)</Label>
            <div className="relative">
              <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="itemPrice"
                type="number"
                min="0"
                step="0.01"
                value={item.price}
                onChange={(e) => setNewItem({ ...item, price: e.target.value })}
                className="pl-8"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="itemDeliveryTime">Preparation Time (minutes)</Label>
            <div className="relative">
              <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="itemDeliveryTime"
                type="number"
                min="0"
                value={item.deliveryTime}
                onChange={(e) => setNewItem({ ...item, deliveryTime: e.target.value })}
                className="pl-8"
                placeholder="15"
              />
            </div>
          </div>
          <div className="md:col-span-2 mb-4">
            <ImagePreview
              imagePreview={imagePreview}
              onImageClick={() => document.getElementById("itemImage").click()}
            />
            <div className="mt-2 flex justify-center">
              <Label
                htmlFor="itemImage"
                className="cursor-pointer inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                <Image className="w-4 h-4 mr-2" />
                {imagePreview ? "Change Image" : "Upload Image"}
              </Label>
              <Input id="itemImage" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="itemIsPopular"
                checked={item.isPopular}
                onCheckedChange={(checked) => setNewItem({ ...item, isPopular: checked })}
              />
              <Label htmlFor="itemIsPopular">Featured Item</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="itemInStock"
                checked={item.inStock}
                onCheckedChange={(checked) => setNewItem({ ...item, inStock: checked })}
              />
              <Label htmlFor="itemInStock">In Stock</Label>
            </div>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="itemDescription">Description</Label>
            <Textarea
              id="itemDescription"
              value={item.description}
              onChange={(e) => setNewItem({ ...item, description: e.target.value })}
              className="mt-1"
              placeholder="Enter item description"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="itemNutrition">Nutrition Information</Label>
            <Textarea
              id="itemNutrition"
              value={item.nutritionInfo}
              onChange={(e) => setNewItem({ ...item, nutritionInfo: e.target.value })}
              className="mt-1"
              placeholder="Enter nutrition information"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="itemAllergens">Allergens</Label>
            <Textarea
              id="itemAllergens"
              value={item.allergens}
              onChange={(e) => setNewItem({ ...item, allergens: e.target.value })}
              className="mt-1"
              placeholder="Enter allergen information"
              rows={2}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <Button onClick={onSubmit} className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white">
            <Check className="w-4 h-4 mr-2" />
            {editingId ? "Update Item" : "Add Item"}
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="w-full md:w-auto border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <CardHeader className="border-b bg-orange-50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-orange-700">Store Items</CardTitle>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)} className="bg-orange-500 text-white hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Add New Item
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {isAdding ? (
          <ItemForm item={newItem} onSubmit={handleAddItem} onCancel={resetForm} />
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>{item.inStock ? "In Stock" : "Out of Stock"}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingId(item.id)
                          setNewItem(item)
                          setIsAdding(true)
                        }}
                        className="mr-2"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" onClick={() => onDeleteItem(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default StoreItems

