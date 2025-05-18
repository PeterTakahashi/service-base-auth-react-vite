import useSWRMutation from "swr/mutation";
import { authClient } from "@/lib/authClient";

async function requestVerifyTokenRequest(
  url: string,
  { arg }: { arg: { email: string } }
): Promise<void> {
  await authClient.post(url, { email: arg.email });
}

export function useRequestVerifyTokenMutation() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/auth/request-verify-token",
    requestVerifyTokenRequest
  );

  return {
    trigger,
    isMutating,
    data,
    error,
  };
}
