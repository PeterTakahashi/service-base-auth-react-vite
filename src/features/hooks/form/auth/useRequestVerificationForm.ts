import { useEffect, useState } from "react";
import { useUser } from "@/features/hooks/swr/fetcher/user/useUser";
import { useRequestVerifyTokenMutation } from "@/features/hooks/swr/mutation/useRequestVerifyTokenMutation";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import type { ErrorModel } from "@/types/api/errorModel";

export function useRequestVerificationForm() {
  const { user, isLoading, isError } = useUser();
  const navigate = useNavigate();
  const { trigger: requestVerifyToken } = useRequestVerifyTokenMutation();

  if (!isLoading && user && user.is_verified) {
    navigate("/");
  }

  const [isMailSent, setIsMailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const doRequest = async () => {
      if (!user) return;

      try {
        await requestVerifyToken({ email: user.email });
        setIsMailSent(true);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorModel>;
          const status = axiosError.response?.status;
          const data = axiosError.response?.data;

          switch (status) {
            case 401:
              setErrorMessage(
                typeof data?.detail === "string"
                  ? data.detail
                  : "Unauthorized. Please sign in again."
              );
              break;

            case 422:
              if (typeof data?.detail === "string") {
                setErrorMessage(data.detail);
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
                typeof data?.detail === "string"
                  ? data.detail
                  : "Failed to send verification email."
              );
          }
        } else {
          setErrorMessage(
            "An unexpected error occurred. Please try again later."
          );
        }
      }
    };

    if (!isLoading && user && !user.is_verified && !isMailSent) {
      void doRequest();
    }
  }, [isLoading, user, isMailSent, requestVerifyToken]);

  return {
    user,
    isLoading,
    isError,
    errorMessage,
  };
}
