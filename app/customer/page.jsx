"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthContext";
import { useFormContext } from "@/app/context/Formcontext"; // Import FormContext
import Spinner from "@/components/Spinner"; // Corrected import path
import { useLogin } from "@/hooks/useLogin";

const Signin = () => {
  const { formData, setFormData } = useFormContext(); // Access form data from context
  const [error, setError] = useState("");
  const { login } = useAuthContext();
  const { mutate, isLoading } = useLogin(login);
  const form = useForm({
    defaultValues: formData, // Use formData from context for default values
    mode: "onChange",
  });

  const emailValidation = {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "Invalid email address",
    },
  };

  const passwordValidation = {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
  };

  const router = useRouter(); // For redirecting after successful login

  const handleGoogleSignIn = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/google-signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Google sign-in failed");
      }
      router.push("/restaurant"); // Redirect to restaurant after successful Google sign-in
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Google sign-in failed. Please try again.");
    }
  };

  const onSubmit = (data) => {
    setError(""); // Clear any previous error messages
    mutate(data, {
      onError: (error) => {
        console.error("Form submission error:", error);
        setError(error.message);
      },
      onSuccess: () => {
        // Update the form context with the new data if necessary
        setFormData((prevData) => ({
          ...prevData,
          email: data.email, // Optionally update other details here
        }));
        router.push("/restaurant"); // Redirect after successful login
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white">
      <div className="w-full max-w-md p-8 bg-white rounded-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black">Welcome back</h1>
          <p className="mt-2 text-gray-600">Login to your Afrochow account</p>
        </div>

        {error && (
          <div className="p-3 mt-4 text-sm text-red-600 rounded-md bg-red-50">
            {error}
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...form.register("email", emailValidation)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="m@example.com"
              disabled={isLoading}
              autoComplete="email"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <a href="/customer/forgot-password" className="text-sm text-black hover:underline">
                Forgot your password?
              </a>
            </div>
            <input
              type="password"
              {...form.register("password", passwordValidation)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              disabled={isLoading}
              autoComplete="current-password"
            />
            {form.formState.errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 text-white bg-black rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            {isLoading ? <Spinner /> : "Login"} {/* Conditionally render the Spinner */}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 mt-6">
            <button
              type="button"
              className="flex items-center justify-center w-full px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={handleGoogleSignIn}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>
          </div>
        </div>

        <p className="mt-8 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/customer/Createaccount" className="font-medium text-black hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
