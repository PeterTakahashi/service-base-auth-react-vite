import useSWR from "swr";
import { fetcher } from "@/features/hooks/swr/fetcher/fetcher";
import type { UserRead } from "@/types/api/user";

export function useUser() {
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR<UserRead>("/users/me", fetcher);

  return {
    user,
    isLoading,
    isError: error,
    mutate,
  };
}
