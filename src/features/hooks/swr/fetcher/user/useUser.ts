import useSWR from "swr";
import { fetcher } from "@/features/hooks/swr/fetcher/fetcher";
import type { UserRead } from "@/types/api/user";
import { useNavigate } from "react-router-dom";

export function useUser() {
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR<UserRead>("/users/me", fetcher);
  const navigate = useNavigate();

  if (!isLoading && error) {
    if (error.status === 401) {
      navigate("/signin", {
        state: { errorMessage: "You must be logged in to access this page." },
      });
    }
  }

  return {
    user,
    isLoading,
    isError: error,
    mutate,
  };
}
