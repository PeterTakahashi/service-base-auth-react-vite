import { forgotPassword } from "@/features/api/auth/forgotPassword";
import { type ForgotPasswordValues } from "@/components/forms/ForgotPasswordForm";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useForgotPassword = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const onSubmitForgotPassword = useCallback(
    async (data: ForgotPasswordValues): Promise<void> => {
      try {
        await forgotPassword(data);
        navigate("/sent-reset-password-mail");
      } catch {
        setErrorMessage(
          "An error occurred while sending the forgot password email. Please try again."
        );
      }
    },
    [navigate]
  );

  return {
    errorMessage,
    onSubmitForgotPassword,
  };
};
