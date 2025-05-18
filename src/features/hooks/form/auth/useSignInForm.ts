// src/features/hooks/form/auth/useSignIn.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useSignInMutation } from "@/features/hooks/swr/mutation/useSignInMutation";
import type { SignInValues } from "@/components/forms/AuthForm";

export function useSignInForm() {
  const navigate = useNavigate();
  const { trigger, isMutating } = useSignInMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitSignIn = async (data: SignInValues) => {
    try {
      const signInResponse = await trigger({
        username: data.email,
        password: data.password,
        scope: "",
        grant_type: "password",
      });

      document.cookie = `access_token=${signInResponse.access_token}; path=/;`;
      navigate("/");
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
    isMutating,
  };
}
