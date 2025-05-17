import { useState } from "react";
import axios, { AxiosError } from "axios";
import { signUp, type SignUpRequestBody } from "@/features/api/auth/signup";
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

      const response = await signUp(requestBody);
      document.cookie = `access_token=${response.access_token}; path=/;`;
      navigate("/");
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
