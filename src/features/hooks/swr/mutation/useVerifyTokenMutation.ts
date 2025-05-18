import useSWRMutation from "swr/mutation";
import { authClient } from "@/lib/authClient";
import type { verifyTokenRequestBody } from "@/types/api/verifyToken";
import type { UserRead } from "@/types/api/user";

async function verifyTokenRequest(
  url: string,
  { arg }: { arg: verifyTokenRequestBody }
): Promise<UserRead> {
  const response = await authClient.post(url, { token: arg.token });
  return response.data;
}

export function useVerifyTokenMutation() {
  const { trigger, isMutating, data, error } = useSWRMutation<
    UserRead,
    Error,
    string,
    verifyTokenRequestBody
  >("/auth/verify", verifyTokenRequest);

  return {
    trigger,
    isMutating,
    data,
    error,
  };
}
