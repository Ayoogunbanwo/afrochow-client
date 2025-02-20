"use client";
import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    street_address: "",
    apartment_number: "",
    city: "",
    province: "",
    postalcode: "",
    country: "Canada",
    profile_image: null,
    email: "",
    password: "",
    
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
