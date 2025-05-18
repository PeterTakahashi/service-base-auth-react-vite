import { useCallback } from "react";
import { authClient } from "@/lib/authClient";
import { mutate } from "swr";

export function useLogout() {
  const logout = useCallback(async () => {
    try {
      await authClient.post("/auth/jwt/logout");
    } catch (error) {
      console.error("Logout request failed", error);
    } finally {
      mutate(() => true, undefined, { revalidate: false });
      document.cookie = "access_token=;path=/;";
      window.location.href = "/signin";
    }
  }, []);

  return { logout };
}
