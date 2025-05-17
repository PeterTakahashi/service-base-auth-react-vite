import useSWR from "swr";
import { fetcher } from "./fetcher";
import type { components } from "@/types/api";

type UserRead = components["schemas"]["UserRead"];

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR<UserRead>(
    "/users/me",
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
}
