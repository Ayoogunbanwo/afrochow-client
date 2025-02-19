"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Upload, Edit2, Check, X, MapPin } from "lucide-react"

const StoreInformation = ({ data, updateData, categories }) => {
  const [logoPreview, setLogoPreview] = useState(data.logo || null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(data)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formDataObj = new FormData(e.target)
    const information = {
      name: formDataObj.get("name"),
      logo: logoPreview,
      description: formDataObj.get("description"),
      location: {
        street: formDataObj.get("street"),
        apartment: formDataObj.get("apartment"),
        city: formDataObj.get("city"),
        postalCode: formDataObj.get("postalCode"),
        country: formDataObj.get("country"),
      },
      phone: formDataObj.get("phone"),
      category: formDataObj.get("category"),
      otherCategory: formDataObj.get("otherCategory"),
    }
    updateData(information)
    setFormData(information)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setLogoPreview(data.logo)
    setFormData(data)
    setIsEditing(false)
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const ViewMode = () => (
    <div className="space-y-6">
      <div className="flex justify-end px-4 sm:px-0">
        <Button
          onClick={() => setIsEditing(true)}
          variant="outline"
          className="text-orange-600 border-orange-600 hover:bg-orange-50"
        >
          <Edit2 className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Edit Information</span>
          <span className="sm:hidden">Edit</span>
        </Button>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden border-2 border-orange-200 transition-all">
          {logoPreview ? (
            <img src={logoPreview} alt="Store logo" className="w-full h-full object-cover" />
          ) : (
            <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-orange-300" />
          )}
        </div>
      </div>

      <div className="grid gap-6 px-4 sm:px-0">
        <div>
          <Label className="text-sm text-gray-500">Store Name</Label>
          <p className="text-lg font-medium mt-1">{formData.name}</p>
        </div>

        <div>
          <Label className="text-sm text-gray-500">Description</Label>
          <p className="text-gray-700 mt-1">{formData.description}</p>
        </div>

        <div className="space-y-4 p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-orange-700">Location</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-sm text-gray-500">Street</Label>
              <p className="text-gray-700 mt-1">{formData.location?.street}</p>
            </div>
            {formData.location?.apartment && (
              <div>
                <Label className="text-sm text-gray-500">Apartment/Suite</Label>
                <p className="text-gray-700 mt-1">{formData.location.apartment}</p>
              </div>
            )}
            <div>
              <Label className="text-sm text-gray-500">City</Label>
              <p className="text-gray-700 mt-1">{formData.location?.city}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-500">Postal Code</Label>
              <p className="text-gray-700 mt-1">{formData.location?.postalCode}</p>
            </div>
            <div className="sm:col-span-2">
              <Label className="text-sm text-gray-500">Country</Label>
              <p className="text-gray-700 mt-1">{formData.location?.country}</p>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm text-gray-500">Phone Number</Label>
          <p className="text-gray-700 mt-1">{formData.phone}</p>
        </div>

        <div>
          <Label className="text-sm text-gray-500">Category</Label>
          <p className="text-gray-700 mt-1">
            {formData.category === "other" ? formData.otherCategory : formData.category}
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="border-b bg-orange-50">
        <CardTitle className="text-xl sm:text-2xl font-bold text-orange-700">Store Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden border-2 border-orange-200 transition-all">
                {logoPreview ? (
                  <img src={logoPreview} alt="Store logo" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-orange-300" />
                )}
              </div>
              <div>
                <Label
                  htmlFor="logo"
                  className="cursor-pointer inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>{logoPreview ? 'Change Logo' : 'Upload Logo'}</span>
                </Label>
                <Input
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid gap-6 px-4 sm:px-0">
              <div>
                <Label htmlFor="name" className="text-gray-700">Store Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  defaultValue={formData.name} 
                  required 
                  className="mt-1" 
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-700">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  defaultValue={formData.description} 
                  className="mt-1 h-24" 
                />
              </div>

              <div className="space-y-4 p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-semibold text-orange-700">Location</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="street" className="text-gray-700">Street</Label>
                    <Input
                      id="street"
                      name="street"
                      defaultValue={formData.location?.street}
                      required
                      placeholder="123 Main St"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="apartment" className="text-gray-700">Apartment/Suite (optional)</Label>
                    <Input
                      id="apartment"
                      name="apartment"
                      defaultValue={formData.location?.apartment}
                      placeholder="Apt 4B"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-gray-700">City</Label>
                    <Input
                      id="city"
                      name="city"
                      defaultValue={formData.location?.city}
                      required
                      placeholder="Toronto"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-gray-700">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      defaultValue={formData.location?.postalCode}
                      required
                      placeholder="A1A 1A1"
                      className="mt-1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="country" className="text-gray-700">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      defaultValue={formData.location?.country || "Canada"}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={formData.phone}
                  required
                  placeholder="(123) 456-7890"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-gray-700">Category</Label>
                <Select name="category" defaultValue={formData.category}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category, index) => (
                      <SelectItem key={index} value={category.label}>
                        {category.label}
                      </SelectItem>
                    ))}
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.category === "other" && (
                <div>
                  <Label htmlFor="otherCategory" className="text-gray-700">Other Category</Label>
                  <Input 
                    id="otherCategory" 
                    name="otherCategory" 
                    defaultValue={formData.otherCategory} 
                    className="mt-1" 
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 px-4 sm:px-0">
              <Button 
                type="submit" 
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white transition-colors"
              >
                <Check className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <ViewMode />
        )}
      </CardContent>
    </Card>
  )
}

export default StoreInformation