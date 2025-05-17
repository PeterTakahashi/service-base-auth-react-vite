import { useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn, type SignInRequestBody } from "@/features/api/auth/signIn";
import type { SignInValues } from "@/components/forms/AuthForm";

export function useSignIn() {
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

  return {
    onSubmitSignIn,
    errorMessage,
  };
}
