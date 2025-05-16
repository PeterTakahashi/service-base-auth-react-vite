import type { FC } from "react";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { AuthForm, type SignInValues } from "@/components/forms/AuthForm";
import { signIn, type SignInRequestBody } from "@/api/auth/signIn";

export const SigninPage: FC = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitSignIn = async (data: SignInValues) => {
    try {
      const requestBody: SignInRequestBody = {
        username: data.email,
        password: data.password,
        scope: "",
        grant_type: "password",
      };
      const response = await signIn(requestBody);
      document.cookie = `access_token=${response.access_token}; path=/;`;
      window.location.href = "/";
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const errorData = axiosError.response?.data as
          | { detail?: string }
          | undefined;
        setErrorMessage(
          errorData?.detail ?? "Sign-in failed. Please check your credentials."
        );
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
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <AuthForm mode="signin" onSubmit={onSubmitSignIn} />

        {errorMessage && (
          <p className="mt-4 text-center text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        <div className="mt-10 text-center text-sm/6 text-gray-500">
          <div>
            No account yet?{" "}
            <a
              href="/signup"
              className="font-semibold text-teal-600 hover:text-teal-500"
            >
              Sign up
            </a>
          </div>
          <div>
            <a
              href="/forgot-password"
              className="font-semibold text-teal-600 hover:text-teal-500"
            >
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
