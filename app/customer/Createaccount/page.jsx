"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SignupForm from "@/components/auth/signup-form";
import Carousel from "@/components/carousel";
import { useFormContext } from "@/app/context/Formcontext";
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from "@/components/ui/toast";

// Constants
const SIGNUP_SLIDES = [
  {
    title: "Explore African cuisine and Market Around you",
    description:
      "Celebrating African cuisine and connecting food lovers across the globe.",
  },
  {
    title: "Discover New Recipes",
    description: "Find traditional and modern African recipes to try at home.",
  },
];

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const { formData, setFormData } = useFormContext(); // Access shared form context

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    mode: "onChange", // Enable real-time validation
  });

  // Reset form when formData changes
  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const onSubmit = useCallback(
    async (data) => {
      try {
        setFormData((prev) => ({ ...prev, ...data }));
        localStorage.setItem("signupFormData", JSON.stringify({ ...formData, ...data }));
        setToastMessage("Signup successful! Redirecting to profile page...");
        setTimeout(() => {
          router.push("/customer/profile");
        }, 10000); // 5 seconds delay before redirecting
      } catch (error) {
        setToastMessage("An error occurred during signup. Please try again.");
      }
    },
    [setFormData, formData, router]
  );

  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen md:flex-row bg-gradient-to-br from-gray-50 to-gray-100">
        <ToastViewport />
        {/* Left column - Carousel */}
        <Carousel slides={SIGNUP_SLIDES} />

        {/* Right column - Signup Form */}
        <div className="relative flex flex-col items-center justify-center w-full h-screen p-8 bg-white md:w-1/2 lg:w-1/2">
          <SignupForm
            register={register}
            errors={errors}
            submissionStatus={null} // No submission status for this step
            isLoading={false} // No loading state for this step
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            handleSubmit={handleSubmit(onSubmit)}
          />
        </div>

        {toastMessage && (
          <Toast>
            <ToastTitle>Notification</ToastTitle>
            <ToastDescription>{toastMessage}</ToastDescription>
            <ToastClose onClick={() => setToastMessage(null)} />
          </Toast>
        )}
      </div>
    </ToastProvider>
  );
};

export default SignupPage;