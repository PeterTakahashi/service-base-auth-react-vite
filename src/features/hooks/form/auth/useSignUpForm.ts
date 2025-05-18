import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { useSignUpMutation } from "@/features/hooks/swr/mutation/useSignUpMutation";
import { useSignInMutation } from "@/features/hooks/swr/mutation/useSignInMutation";
import type { SignUpValues } from "@/components/forms/AuthForm";
import type { ErrorModel } from "@/types/api/errorModel";

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
        const axiosError = error as AxiosError<ErrorModel>;
        const status = axiosError.response?.status;
        const respData = axiosError.response?.data;
        const detail = respData?.detail;

        switch (status) {
          case 400:
            if (detail === "REGISTER_USER_ALREADY_EXISTS") {
              setErrorMessage(
                "User already exists. Please try a different email."
              );
            } else {
              setErrorMessage(
                typeof detail === "string"
                  ? detail
                  : "Bad request: Please check your input."
              );
            }
            break;

          case 422:
            setErrorMessage(
              typeof detail === "string"
                ? detail
                : "Validation Error. Please check your input."
            );
            break;

          case 500:
            setErrorMessage("A server error occurred. Please try again later.");
            break;

          default:
            setErrorMessage(
              typeof detail === "string"
                ? detail
                : "An unexpected error occurred. Please try again."
            );
            break;
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
