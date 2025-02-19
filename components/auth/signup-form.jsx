import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/app/context/Formcontext";

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" className="inline-block" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
    />
    <path
      fill="#34A853"
      d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"
    />
    <path
      fill="#EA4335"
      d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
    />
  </svg>
);

const SignupForm = () => {
  const { formData, setFormData } = useFormContext();
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState(null);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const { register, handleSubmit, formState: { errors }, watch, getValues } = useForm({
    defaultValues: formData,
    mode: "onChange"
  });

  const password = watch("password", "");

  const validatePassword = (value) => {
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
    if (!/[0-9]/.test(value)) return "Password must contain at least one number";
    if (!/[^A-Za-z0-9]/.test(value)) return "Password must contain at least one special character";
    return true;
  };

  const validateConfirm_Password = (value) => {
    return value === getValues("password") || "Passwords do not match";
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: "None", color: "text-gray-500" };
    const criteria = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password)
    ];
    const metCriteria = criteria.filter(Boolean).length;
    
    if (metCriteria === 4) return { strength: "Strong", color: "text-green-500" };
    if (metCriteria === 3) return { strength: "Good", color: "text-yellow-500" };
    return { strength: "Weak", color: "text-red-500" };
  };

  const passwordStatus = getPasswordStrength(password);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      setFormData((prev) => ({ ...prev, ...data }));
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmissionStatus("success");
      router.push("/customer/Profile");
    } catch (error) {
      setSubmissionStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const PasswordToggleButton = ({ show, onToggle, ariaControls }) => (
    <button
      type="button"
      onClick={onToggle}
      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
      aria-label={show ? 'Hide password' : 'Show password'}
      aria-controls={ariaControls}
    >
      {show ? (
        <EyeOffIcon className="w-4 h-4" aria-hidden="true" />
      ) : (
        <EyeIcon className="w-4 h-4" aria-hidden="true" />
      )}
    </button>
  );

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Create an account
        </CardTitle>
        <p className="text-center text-gray-500">
          Enter your details to sign up
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <button
          type="button"
          className="flex items-center justify-center w-full gap-3 px-4 py-2 transition-colors duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          <GoogleLogo />
          <span>Sign in with Google</span>
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">
              Or continue with email
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="you@example.com"
              aria-describedby={errors.email ? "email-error" : undefined}
              autoComplete="email"
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { validate: validatePassword })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Create a strong password"
                aria-describedby="password-requirements"
                autoComplete="new-password"
              />
              <PasswordToggleButton
                show={showPassword}
                onToggle={togglePasswordVisibility}
                ariaControls="password"
              />
            </div>
            {password && (
              <div id="password-requirements" className="space-y-1 text-sm">
                <p className={passwordStatus.color}>
                  Password Strength: {passwordStatus.strength}
                </p>
                <ul className="pl-4 text-xs text-gray-500 list-disc">
                  <li className={password.length >= 8 ? "text-green-500" : ""}>
                    At least 8 characters
                  </li>
                  <li className={/[A-Z]/.test(password) ? "text-green-500" : ""}>
                    One uppercase letter
                  </li>
                  <li className={/[0-9]/.test(password) ? "text-green-500" : ""}>
                    One number
                  </li>
                  <li className={/[^A-Za-z0-9]/.test(password) ? "text-green-500" : ""}>
                    One special character
                  </li>
                </ul>
              </div>
            )}
            {errors.password && (
              <p className="text-sm text-red-500" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirm_password", { validate: validateConfirm_Password })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Confirm your password"
                autoComplete="new-password"
              />
              <PasswordToggleButton
                show={showPassword}
                onToggle={togglePasswordVisibility}
                ariaControls="confirmPassword"
              />
            </div>
            {errors.confirm_password && (
              <p className="text-sm text-red-500" role="alert">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white transition-colors duration-200 bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-live="polite"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-3 text-white animate-spin"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating your account...
              </span>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        {submissionStatus === "success" && (
          <div
            className="p-3 text-sm text-green-700 bg-green-100 rounded-md"
            role="alert"
          >
            Your account has been created successfully!
          </div>
        )}
        {submissionStatus === "error" && (
          <div
            className="p-3 text-sm text-red-700 bg-red-100 rounded-md"
            role="alert"
          >
            Something went wrong. Please try again.
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col items-center space-y-2">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/customer"
            className="font-semibold text-orange-500 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            Sign in
          </a>
        </p>
        <p className="text-sm text-center text-gray-500">
          By signing up, you agree to our{" "}
          <a
            href="/terms"
            className="font-semibold text-orange-500 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            Terms and Conditions
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}

export default SignupForm;