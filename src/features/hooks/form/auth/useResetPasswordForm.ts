import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";

import type { ResetPasswordValues } from "@/components/forms/ResetPasswordForm";
import { useResetPasswordMutation } from "@/features/hooks/swr/mutation/useResetPasswordMutation";
import type { ErrorModel } from "@/types/api/errorModel";

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
        await trigger({ password, token });
        setErrorMessage(null);
        navigate("/signin");
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError<ErrorModel>;
          const status = axiosError.response?.status;
          const data = axiosError.response?.data;

          switch (status) {
            case 400: {
              if (data?.detail === "RESET_PASSWORD_BAD_TOKEN") {
                setErrorMessage(
                  "The token is invalid or has expired. Please request a new password reset."
                );
              } else {
                setErrorMessage(
                  typeof data?.detail === "string"
                    ? data.detail
                    : "Bad request. Please check your input."
                );
              }
              break;
            }
            case 422: {
              const detail = data?.detail;
              if (typeof detail === "string") {
                setErrorMessage(detail);
              } else if (typeof detail === "object") {
                const firstKey = Object.keys(detail)[0];
                setErrorMessage(
                  `Validation Error: ${firstKey} -> ${detail[firstKey]}`
                );
              } else {
                setErrorMessage("Validation Error. Please check your input.");
              }
              break;
            }
            case 500: {
              setErrorMessage(
                "A server error occurred. Please try again later."
              );
              break;
            }
            default: {
              setErrorMessage(
                typeof data?.detail === "string"
                  ? data.detail
                  : "An unexpected error occurred. Please try again."
              );
            }
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
