import useSWRMutation from "swr/mutation";
import { authClient } from "@/lib/authClient";
import type { UserUpdate, UserRead } from "@/types/api/user";

async function patchUser(
  url: string,
  { arg }: { arg: UserUpdate }
): Promise<UserRead> {
  const response = await authClient.patch<UserRead>(url, arg);
  return response.data;
}

export function useEditUserMutation() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/users/me",
    patchUser
  );

  return {
    trigger,
    isMutating,
    data,
    error,
  };
}
