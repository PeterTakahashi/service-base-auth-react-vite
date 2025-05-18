import { useState } from "react";
import axios, { AxiosError } from "axios";
import { signUp } from "@/features/api/auth/signup";
import { signIn, type SignInRequestBody } from "@/features/api/auth/signIn";
import type { SignUpRequestBody } from "@/types/api/signup";
import type { SignUpValues } from "@/components/forms/AuthForm";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmitSignUp = async (data: SignUpValues) => {
    try {
      const requestBody: SignUpRequestBody = {
        email: data.email,
        password: data.password,
      };

      await signUp(requestBody);
      const signIn$RequestBody: SignInRequestBody = {
        username: data.email,
        password: data.password,
        scope: "",
        grant_type: "password",
      };

      const signInResponse = await signIn(signIn$RequestBody);
      document.cookie = `access_token=${signInResponse.access_token}; path=/;`;
      navigate("/not-verified");
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
            (axiosError.response?.data as { detail?: string })?.detail ||
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

  return {
    onSubmitSignUp,
    errorMessage,
  };
}
