"use client";
import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    street_address: "",
    city: "",
    province: "",
    postalcode: "",
    country: "Canada",
    apartment_number: "",
    email: "",
    password: "",
    profile_image: null,
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
