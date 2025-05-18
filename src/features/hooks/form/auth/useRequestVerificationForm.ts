import { useEffect, useState } from "react";
import { useUser } from "@/features/hooks/swr/fetcher/user/useUser";
import { useRequestVerifyTokenMutation } from "@/features/hooks/swr/mutation/useRequestVerifyTokenMutation";
import { useNavigate } from "react-router-dom";
import { parseAxiosErrorMessage } from "@/lib/parseAxiosErrorMessage";

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
      } catch (error) {
        setErrorMessage(parseAxiosErrorMessage(error));
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
