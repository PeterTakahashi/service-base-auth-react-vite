import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { useForgotPasswordMutation } from "@/features/hooks/swr/mutation/useForgotPasswordMutation";
import { type ForgotPasswordValues } from "@/components/forms/ForgotPasswordForm";
import type { ErrorModel } from "@/types/api/errorModel";

export const useForgotPasswordForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { trigger: forgotPasswordTrigger, isMutating } =
    useForgotPasswordMutation();
  const navigate = useNavigate();

  const onSubmitForgotPassword = useCallback(
    async (data: ForgotPasswordValues): Promise<void> => {
      try {
        await forgotPasswordTrigger(data);
        navigate("/sent-reset-password-mail");
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorModel>;
          const status = axiosError.response?.status;
          const respData = axiosError.response?.data;

          switch (status) {
            case 422:
              // Validation Error
              if (typeof respData?.detail === "string") {
                setErrorMessage(respData.detail);
              } else {
                setErrorMessage("Validation Error. Please check your input.");
              }
              break;

            case 500:
              setErrorMessage(
                "A server error occurred. Please try again later."
              );
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
    },
    [forgotPasswordTrigger, navigate]
  );

  return {
    errorMessage,
    onSubmitForgotPassword,
    isMutating,
  };
};
