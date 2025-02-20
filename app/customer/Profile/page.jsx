"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/app/context/Formcontext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserCircle, Camera, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";


const PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Nova Scotia",
  "Ontario",
  "Quebec",
  "Saskatchewan",
];

// Improved validation functions
const validatePhoneNumber = (value) => {
  const stripped = value.replace(/[\s-()]/g, "");
  return (
    /^(\+?1)?[0-9]{10}$/.test(stripped) ||
    "Please enter a valid 10-digit phone number"
  );
};

const validatePostalCode = (value) => {
  const formatted = value.replace(/\s/g, "").toUpperCase();
  return (
    /^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(formatted) ||
    "Please enter a valid postal code (e.g., A1B 2C3)"
  );
};

const formatPostalCode = (value) => {
  if (!value) return value;
  const cleaned = value.replace(/\s/g, "").toUpperCase();
  return cleaned.length > 3
    ? `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`
    : cleaned;
};

const FormField = ({ label, name, error, children, placeholder }) => (
  <div className="space-y-1.5 group relative">
    <Label
      htmlFor={name}
      className="inline-block text-sm font-medium transition-transform duration-200 group-focus-within:text-blue-500"
    >
      {label}
    </Label>
    {React.cloneElement(children, {
      id: name,
      placeholder,
      "aria-invalid": error ? "true" : "false",
      "aria-describedby": error ? `${name}-error` : undefined,
      className: `transition-all duration-300 ${
        error
          ? "border-red-500 focus:border-red-500 animate-shake"
          : "group-hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      }`,
    })}
    {error && (
      <p
        id={`${name}-error`}
        className="absolute text-xs text-red-500 animate-slideIn -bottom-5"
      >
        {error.message}
      </p>
    )}
  </div>
);

const ImageUpload = ({ file, onImageChange }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    if (file) {
      const url = file instanceof File ? URL.createObjectURL(file) : file;
      setImageUrl(url);
      return () => file instanceof File && URL.revokeObjectURL(url);
    }
  }, [file]);

  const validateImage = (file) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB");
      return false;
    }
    setError("");
    return true;
  };

  const handleImageSelection = (file) => {
    if (file && validateImage(file)) {
      onImageChange({ target: { files: [file] } });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageSelection(file);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        role="button"
        tabIndex={0}
        className={`relative cursor-pointer group focus:outline-none rounded-full
          ${isDragging ? "scale-110" : "hover:scale-105"} 
          transition-all duration-300 ease-in-out`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        aria-label="Upload profile photo"
      >
        <div
          className={`w-40 h-40 overflow-hidden border-4 rounded-full shadow-lg
          ${
            isDragging
              ? "border-blue-400 shadow-blue-200"
              : "border-blue-100 group-hover:border-blue-300 group-hover:shadow-xl"
          }`}
        >
          {imageUrl ? (
            <div className="relative w-full h-full">
              <img
                src={imageUrl}
                alt="Profile Preview"
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-b from-transparent to-black/10 group-hover:opacity-100" />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-50 to-gray-100">
              <UserCircle className="w-24 h-24 text-gray-400 transition-transform duration-300 group-hover:scale-110" />
            </div>
          )}
        </div>

        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
          <div className="flex items-center justify-center w-full h-full rounded-full bg-black/50 backdrop-blur-sm">
            <Camera className="w-12 h-12 text-white animate-pulse" />
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={(e) => handleImageSelection(e.target.files?.[0])}
        />
      </div>
      {error ? (
        <p className="text-sm text-red-500 animate-slideIn">{error}</p>
      ) : (
        <p className="text-sm text-gray-500 transition-colors duration-200 group-hover:text-blue-500">
          {isDragging
            ? "Drop your photo here"
            : `Click to ${imageUrl ? "change" : "upload"} profile photo`}
        </p>
      )}
    </div>
  );
};

const ProfileForm = () => {
  const { formData, setFormData } = useFormContext(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  // Retrieve formData from local storage
  useEffect(() => {
    const storedFormData = localStorage.getItem("signupFormData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, [setFormData]);

  const defaultValues = useMemo(
    () => ({
      ...formData,
      profile_image: null,
      province: formData.province || "", // Ensure province has a default value
    }),
    [formData]
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onBlur",
  });

  // Watch postal code value for formatting
  const postalCode = watch("postalcode");
  useEffect(() => {
    if (postalCode) {
      setValue("postalcode", formatPostalCode(postalCode));
    }
  }, [postalCode, setValue]);

  const onSubmit = async (data) => {
    setSubmitError("");

    try {
      const formDataToSend = new FormData();

      // Retrieve email, password, and confirm_password from local storage
      const storedFormData = JSON.parse(localStorage.getItem("signupFormData"));
      const combinedData = { ...storedFormData, ...data };

      // Append all form data
      Object.entries(combinedData).forEach(([key, value]) => {
        if (value != null) {
          formDataToSend.append(key, value);
        }
      });

      // Append the profile image if it exists
      if (previewFile) {
        formDataToSend.append("profile_image", previewFile);
      }

      formDataToSend.append("country", "Canada");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors && errorData.errors.email) {
          throw new Error(errorData.errors.email[0]);
        }
        throw new Error(errorData.message || "Failed to submit form");
      }

      localStorage.removeItem("signupFormData");
      setFormData((prev) => ({ ...prev, ...combinedData }));
      
      router.push("/customer");
    } catch (error) {
      setSubmitError(
        error.message || "An error occurred while submitting. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Card className="w-full max-w-2xl mx-auto transition-all duration-500 transform hover:shadow-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text">
            Complete Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          {submitError && (
            <Alert variant="destructive" className="mb-6 animate-slideIn">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col items-center mb-8">
              <ImageUpload
                file={previewFile}
                onImageChange={(e) => setPreviewFile(e.target.files?.[0])}
              />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 animate-fadeIn">
              <FormField
                label="First Name"
                name="firstname"
                error={errors.firstname}
                placeholder="Enter your first name"
              >
                <Input
                  {...register("firstname", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "First name must be at least 2 characters",
                    },
                  })}
                />
              </FormField>

              <FormField
                label="Last Name"
                name="lastname"
                error={errors.lastname}
                placeholder="Enter your last name"
              >
                <Input
                  {...register("lastname", {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Last name must be at least 2 characters",
                    },
                  })}
                />
              </FormField>

              <FormField
                label="Phone Number"
                name="phone"
                error={errors.phone}
                placeholder="Enter your phone number"
              >
                <Input
                  {...register("phone", {
                    required: "Phone number is required",
                    validate: validatePhoneNumber,
                  })}
                  type="tel"
                />
              </FormField>

              <FormField
                label="Apartment Number (Optional)"
                name="apartment_number"
                error={errors.apartment_number}
                placeholder="Enter your apartment number"
              >
                <Input {...register("apartment_number")} />
              </FormField>

              <FormField
                label="Street"
                name="street_address"
                error={errors.street_address}
                placeholder="Enter your street address"
              >
                <Input
                  {...register("street_address", {
                    required: "Street address is required",
                    minLength: {
                      value: 5,
                      message: "Please enter a valid street address",
                    },
                  })}
                />
              </FormField>

              <FormField
                label="City"
                name="city"
                error={errors.city}
                placeholder="Enter your city"
              >
                <Input
                  {...register("city", {
                    required: "City is required",
                    minLength: {
                      value: 2,
                      message: "Please enter a valid city name",
                    },
                  })}
                />
              </FormField>

              <div className="space-y-1.5">
                <Label htmlFor="province" className="text-sm font-medium">
                  Province
                </Label>
                <Select
                  onValueChange={(value) => setValue("province", value)}
                  defaultValue={defaultValues.province}
                >
                  <SelectTrigger
                    id="province"
                    className={`w-full ${
                      errors.province ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select Province" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROVINCES.map((prov) => (
                      <SelectItem key={prov} value={prov}>
                        {prov}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.province && (
                  <p className="text-xs text-red-500">
                    {errors.province.message}
                  </p>
                )}
              </div>

              <FormField
                label="Postal Code"
                name="postalcode"
                error={errors.postalcode}
                placeholder="Enter your postal code"
              >
                <Input
                  {...register("postalcode", {
                    required: "Postal code is required",
                    validate: validatePostalCode,
                  })}
                  maxLength={7}
                />
              </FormField>
            </div>

            <Button
              type="submit"
              className="w-full h-12 transition-all duration-300 transform bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-blue-600 hover:to-purple-600 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center">
                  <span className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="inline-flex items-center">
                  Complete Profile
                  <Sparkles className="w-5 h-5 ml-2 animate-pulse" />
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;
