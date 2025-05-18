import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useSignUpMutation } from "@/features/hooks/swr/mutation/useSignUpMutation";
import { useSignInMutation } from "@/features/hooks/swr/mutation/useSignInMutation";
import type { SignUpValues } from "@/components/forms/AuthForm";

export function useSignUpForm() {
  const navigate = useNavigate();
  const { trigger: signUpTrigger, isMutating: isSignUpMutating } =
    useSignUpMutation();
  const { trigger: signInTrigger, isMutating: isSignInMutating } =
    useSignInMutation();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitSignUp = async (data: SignUpValues) => {
    try {
      await signUpTrigger({
        email: data.email,
        password: data.password,
      });

      const signInResponse = await signInTrigger({
        username: data.email,
        password: data.password,
        scope: "",
        grant_type: "password",
      });

      document.cookie = `access_token=${signInResponse.access_token}; path=/;`;

      navigate("/not-verified");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 400) {
          const detail = (axiosError.response?.data as { detail?: string })
            .detail;
          if (detail === "REGISTER_USER_ALREADY_EXISTS") {
            setErrorMessage(
              "User already exists. Please try a different email."
            );
          } else {
            setErrorMessage("Bad request: Please check your input.");
          }
        } else {
          const detail = (axiosError.response?.data as { detail?: string })
            ?.detail;
          setErrorMessage(detail || "Sign-up failed. Please try again later.");
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
    isMutating: isSignUpMutating || isSignInMutating,
  };
}
