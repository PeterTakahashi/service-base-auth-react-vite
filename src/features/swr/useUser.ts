import useSWR from "swr";
import { fetcher } from "@/features/swr/fetcher";
import type { components } from "@/types/api";
import { useNavigate } from "react-router-dom";

type UserRead = components["schemas"]["UserRead"];

export function useUser() {
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR<UserRead>("/users/me", fetcher);
  const navigate = useNavigate();

  if (!user && !isLoading && error) {
    if (error.status === 401) {
      document.cookie = "access_token=;path=/;";
      navigate("/signin");
    }
  }

  return {
    user,
    isLoading,
    isError: error,
    mutate,
  };
}
