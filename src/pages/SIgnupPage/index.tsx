import type { FC } from "react";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { AuthForm, type SignUpValues } from "@/components/forms/AuthForm";
import { signUp, type SignUpRequestBody } from "@/features/api/auth/signup";

export const SignupPage: FC = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitSignUp = async (data: SignUpValues) => {
    try {
      const requestBody: SignUpRequestBody = {
        email: data.email,
        password: data.password,
      };
      const response = await signUp(requestBody);
      document.cookie = `access_token=${response.access_token}; path=/;`;
      window.location.href = "/";
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 400) {
          if (
            (axiosError.response?.data as { detail?: string }).detail ===
            "REGISTER_USER_ALREADY_EXISTS"
          ) {
            setErrorMessage(
              "User already exists. Please try a different email."
            );
          } else {
            setErrorMessage("Bad request: Please check your input.");
          }
        } else {
          setErrorMessage(
            error?.response?.data?.detail ||
              "Sign-up failed. Please check your information and try again."
          );
        }
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* AuthForm will call onSubmitSignUp on form submission */}
        <AuthForm mode="signup" onSubmit={onSubmitSignUp} />

        {/* Display error message if present */}
        {errorMessage && (
          <p className="mt-4 text-center text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        <div className="mt-10 text-center text-sm/6 text-gray-500">
          If you already have an account,{" "}
          <a
            href="/signin"
            className="font-semibold text-teal-600 hover:text-teal-500"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};
