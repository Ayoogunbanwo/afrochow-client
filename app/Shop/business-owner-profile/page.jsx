"use client"

import { useState } from "react"
import FileUpload from "@/components/FileUpload"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Building2, MapPin, FileCheck, Loader2 } from "lucide-react"

// List of Canadian provinces
const PROVINCES = [
  { value: "AB", label: "Alberta" },
  { value: "BC", label: "British Columbia" },
  { value: "MB", label: "Manitoba" },
  { value: "NB", label: "New Brunswick" },
  { value: "NL", label: "Newfoundland and Labrador" },
  { value: "NS", label: "Nova Scotia" },
  { value: "NT", label: "Northwest Territories" },
  { value: "NU", label: "Nunavut" },
  { value: "ON", label: "Ontario" },
  { value: "PE", label: "Prince Edward Island" },
  { value: "QC", label: "Quebec" },
  { value: "SK", label: "Saskatchewan" },
  { value: "YT", label: "Yukon" }
]

// Animated Section Component
const AnimatedSection = ({ children, delay = 0 }) => (
  <div
    className="animate-in fade-in slide-in-from-bottom duration-700"
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
)

// File Upload Component
const DocumentUpload = ({ id, label, type, onChange, disabled }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-gray-700">{label}</Label>
      <FileUpload
        id={id}
        type={type}
        accept="image/*"
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}

// Verification function with mock result
const verifyWithTrulioo = async (ownerData) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const isVerified = ownerData.firstName && ownerData.lastName && ownerData.address.street
  return {
    status: isVerified ? "Verified" : "Rejected",
    message: isVerified ? "Verification successful" : "Verification failed",
  }
}

const BusinessOwnerProfile = () => {
  const [owner, setOwner] = useState({
    firstName: "",
    lastName: "",
    address: {
      street: "",
      apartmentNumber: "",
      city: "",
      province: "",
      country: "Canada",
    },
    registrationNumber: "",
    verificationStatus: "Pending",
  })

  const [files, setFiles] = useState({
    idCard: {
      front: null,
      back: null
    },
    photo: null
  })

  const [verificationMessage, setVerificationMessage] = useState("")
  const [isEditable, setIsEditable] = useState(true)
  const [hasSubmitted, setHasSubmitted] = useState(false)  // Track submission status
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setOwner((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }))
    } else {
      setOwner((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleProvinceChange = (value) => {
    setOwner(prev => ({
      ...prev,
      address: {
        ...prev.address,
        province: value
      }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!files.idCard.front || !files.photo) {
      setVerificationMessage("Please upload both ID front side and profile photo")
      return
    }

    if (!owner.address.province) {
      setVerificationMessage("Please select a province")
      return
    }

    setIsSubmitting(true)
    const result = await verifyWithTrulioo(owner)
    setOwner((prev) => ({ ...prev, verificationStatus: result.status }))
    setVerificationMessage(result.message)
    setIsSubmitting(false)
    setHasSubmitted(true)  // Mark the form as submitted
  }

  const sections = [
    { title: "Personal Information", icon: User },
    { title: "Address Details", icon: MapPin },
    { title: "Business Information", icon: Building2 },
    { title: "Document Upload", icon: FileCheck },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 p-4 transition-all duration-500">
      <div className="max-w-4xl mx-auto pt-8 pb-16">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center max-w-2xl mx-auto mb-8">
            {sections.map((section, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${index <= currentSection ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}
                >
                  <section.icon className="w-5 h-5" />
                </div>
                <span className="text-xs mt-2 text-gray-600">{section.title}</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="w-full border-none shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl text-center font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
              Create Business Owner Profile
            </CardTitle>
            <p className="text-center text-gray-500">Please fill in your details below</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <AnimatedSection delay={100}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={owner.firstName}
                      onChange={handleInputChange}
                      required
                      className="transition-all duration-300 hover:border-orange-300 focus:border-orange-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={owner.lastName}
                      onChange={handleInputChange}
                      required
                      className="transition-all duration-300 hover:border-orange-300 focus:border-orange-500"
                    />
                  </div>
                </div>
              </AnimatedSection>

              {/* Address */}
              <AnimatedSection delay={200}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="street" className="text-gray-700">Street Address</Label>
                    <Input
                      id="street"
                      name="address.street"
                      value={owner.address.street}
                      onChange={handleInputChange}
                      required
                      className="transition-all duration-300 hover:border-orange-300 focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="apartmentNumber" className="text-gray-700">Apartment Number</Label>
                      <Input
                        id="apartmentNumber"
                        name="address.apartmentNumber"
                        value={owner.address.apartmentNumber}
                        onChange={handleInputChange}
                        className="transition-all duration-300 hover:border-orange-300 focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-gray-700">City</Label>
                      <Input
                        id="city"
                        name="address.city"
                        value={owner.address.city}
                        onChange={handleInputChange}
                        required
                        className="transition-all duration-300 hover:border-orange-300 focus:border-orange-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="province" className="text-gray-700">Province</Label>
                    <Select
                      value={owner.address.province}
                      onValueChange={handleProvinceChange}
                      disabled={hasSubmitted}
                    >
                      <SelectTrigger className="transition-all duration-300 hover:border-orange-300 focus:border-orange-500">
                        <SelectValue placeholder="Select a province" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROVINCES.map((prov) => (
                          <SelectItem key={prov.value} value={prov.value}>
                            {prov.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AnimatedSection>

              {/* Document Upload */}
              <AnimatedSection delay={300}>
                <DocumentUpload
                  id="id"
                  label="ID Card Front"
                  type="id-front"
                  onChange={(file) => setFiles((prev) => ({ ...prev, idCard: { ...prev.idCard, front: file } }))}
                  disabled={hasSubmitted}
                />
                <DocumentUpload
                  id="id"
                  label="ID Card Back"
                  type="id-back"
                  onChange={(file) => setFiles((prev) => ({ ...prev, idCard: { ...prev.idCard, back: file } }))}
                  disabled={hasSubmitted}
                />
                <DocumentUpload
                  id="photo"
                  label="Profile Photo"
                  type="photo"
                  onChange={(file) => setFiles((prev) => ({ ...prev, photo: file }))}
                  disabled={hasSubmitted}
                />
              </AnimatedSection>

              <div className="flex justify-between items-center">
                {verificationMessage && (
                  <Alert variant="destructive">
                    <AlertDescription>{verificationMessage}</AlertDescription>
                  </Alert>
                )}
                <Button
                  type="submit"
                  disabled={isSubmitting || hasSubmitted}
                  className="w-full sm:w-auto mt-6 flex justify-center items-center gap-2 bg-orange-500 text-white hover:bg-orange-700"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : hasSubmitted ? "Profile Created" : "Submit"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BusinessOwnerProfile
