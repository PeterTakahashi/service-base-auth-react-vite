import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";

import type { ResetPasswordValues } from "@/components/forms/ResetPasswordForm";
import { useResetPasswordMutation } from "@/features/hooks/swr/mutation/useResetPasswordMutation";

export const useResetPasswordForm = () => {
  const { token } = useParams<{ token: string }>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const { trigger, isMutating } = useResetPasswordMutation();

  const onSubmitResetPassword = useCallback(
    async (values: ResetPasswordValues) => {
      const { password } = values;
      if (!token) {
        setErrorMessage("Token is missing");
        return;
      }
      try {
        await trigger({
          password,
          token,
        });
        setErrorMessage(null);
        navigate("/signin");
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          const errorData = axiosError.response?.data as
            | { detail?: string }
            | undefined;

          if (errorData?.detail === "RESET_PASSWORD_BAD_TOKEN") {
            setErrorMessage(
              "The token is invalid or has expired. Please request a new password reset."
            );
          } else {
            setErrorMessage(
              errorData?.detail ??
                "An error occurred while resetting the password. Please try again."
            );
          }
        } else {
          setErrorMessage(
            "An unexpected error occurred. Please try again later."
          );
        }
      }
    },
    [token, navigate, trigger]
  );

  return {
    onSubmitResetPassword,
    errorMessage,
    isMutating,
  };
};
