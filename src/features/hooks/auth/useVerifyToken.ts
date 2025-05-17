import { useEffect } from "react";
import { useUser } from "@/features/swr/useUser";
import { verifyToken } from "@/features/api/auth/verifyToken";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export function useVerifyToken() {
  const { token } = useParams<{ token: string }>();
  const { user, isLoading, mutate } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const doVerify = async () => {
      if (!token) return;
      if (user?.is_verified) {
        navigate("/");
        return;
      }

      try {
        const user = await verifyToken({ token });
        if (user.is_verified) {
          navigate("/");
        } else {
          navigate("/not-verified");
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (!isLoading && user && !user.is_verified && token) {
      doVerify();
    }
  }, [isLoading, user, token, mutate, navigate]);
}
