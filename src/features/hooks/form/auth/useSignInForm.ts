import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { useSignInMutation } from "@/features/hooks/swr/mutation/useSignInMutation";
import type { SignInValues } from "@/components/forms/AuthForm";
import type { ErrorModel } from "@/types/api/errorModel";

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
        const axiosError = error as AxiosError<ErrorModel>;
        const status = axiosError.response?.status;
        const respData = axiosError.response?.data;

        switch (status) {
          case 400:
            setErrorMessage(
              typeof respData?.detail === "string"
                ? respData.detail
                : "Sign-in failed. Check your credentials."
            );
            break;

          case 422:
            setErrorMessage(
              typeof respData?.detail === "string"
                ? respData.detail
                : "Validation Error. Please check your input."
            );
            break;

          case 500:
            setErrorMessage("A server error occurred. Please try again later.");
            break;

          default:
            setErrorMessage(
              typeof respData?.detail === "string"
                ? respData.detail
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
    onSubmitSignIn,
    errorMessage,
    isMutating,
  };
}
