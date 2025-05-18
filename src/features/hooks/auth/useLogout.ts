import { useCallback } from "react";
import { authClient } from "@/lib/authClient";
import { mutate } from "swr";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const logout = useCallback(async () => {
    try {
      await authClient.post("/auth/jwt/logout");
    } catch (error) {
      console.error("Logout request failed", error);
    } finally {
      mutate(() => true, undefined, { revalidate: false });
      document.cookie = "access_token=;path=/;";
      navigate("/signin", {
        state: { successMessage: "Logged out successfully" },
      });
    }
  }, [navigate]);

  return { logout };
}
