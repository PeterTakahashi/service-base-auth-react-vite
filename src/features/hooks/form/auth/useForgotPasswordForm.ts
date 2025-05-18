import { useForgotPasswordMutation } from "@/features/hooks/swr/mutation/useForgotPasswordMutation";
import { type ForgotPasswordValues } from "@/components/forms/ForgotPasswordForm";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      } catch {
        setErrorMessage("An error occurred while sending ...");
      }
    },
    [navigate, forgotPasswordTrigger]
  );

  return {
    errorMessage,
    onSubmitForgotPassword,
    isMutating,
  };
};
