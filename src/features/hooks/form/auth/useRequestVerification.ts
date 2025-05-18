import { useEffect, useState } from "react";
import { useUser } from "@/features/hooks/swr/fetcher/user/useUser";
import { requestVerifyToken } from "@/features/api/auth/requestVerifyToken";
import { useNavigate } from "react-router-dom";

/**
 * If the user is unverified, automatically call `requestVerifyToken`.
 */
export function useRequestVerification() {
  const { user, isLoading, isError } = useUser();
  const navigate = useNavigate();

  if (!isLoading && user && user.is_verified) {
    navigate("/");
  }
  const [isMailSent, setIsMailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const doRequest = async () => {
      if (!user) return;
      try {
        await requestVerifyToken(user.email);
        setIsMailSent(true);
      } catch (err) {
        console.error(err);
        setErrorMessage("Failed to send verification email.");
      }
    };

    if (!isLoading && user && !user.is_verified && !isMailSent) {
      doRequest();
    }
  }, [isLoading, user, isMailSent]);

  return {
    user,
    isLoading,
    isError,
    errorMessage,
  };
}
