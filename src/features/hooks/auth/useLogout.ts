import { useCallback } from "react";
import { client } from "@/lib/client";
import { mutate } from "swr";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const logout = useCallback(async () => {
    try {
      await client.post("/auth/cookie/logout");
    } catch (error) {
      console.error("Logout request failed", error);
    } finally {
      mutate(() => true, undefined, { revalidate: false });
      navigate("/signin", {
        state: { successMessage: "Logged out successfully" },
      });
    }
  }, [navigate]);

  return { logout };
}
