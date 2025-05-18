import useSWRMutation from "swr/mutation";
import { client } from "@/lib/client";
import type { SignInRequestBody, SignInResponse } from "@/types/api/signIn";

async function signInRequest(url: string, { arg }: { arg: SignInRequestBody }) {
  const { data } = await client.post<SignInResponse>(url, arg);
  return data;
}

export function useSignInMutation() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/auth/sign-in",
    signInRequest
  );
  return {
    trigger,
    isMutating,
    data,
    error,
  };
}
