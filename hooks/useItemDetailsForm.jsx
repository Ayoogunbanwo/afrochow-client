import { useState } from "react"

export function useItemDetailsForm() {
  const [formData, setFormData] = useState({
    deliveryOption: "delivery",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    deliveryInstructions: "",
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (formData.deliveryOption === "delivery") {
      if (!formData.address.trim()) {
        newErrors.address = "Address is required"
      }
      if (!formData.city.trim()) {
        newErrors.city = "City is required"
      }
      if (!formData.province) {
        newErrors.province = "Province is required"
      }
      if (!formData.postalCode.trim()) {
        newErrors.postalCode = "Postal code is required"
      } else if (!/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(formData.postalCode)) {
        newErrors.postalCode = "Invalid postal code format"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return {
    formData,
    setFormData,
    handleInputChange,
    validateForm,
    errors,
  }
}

