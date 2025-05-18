import { client } from "@/lib/client";
import type { SignInRequestBody, SignInResponse } from "@/types/api/signIn";

export async function signIn(data: SignInRequestBody): Promise<SignInResponse> {
  const formData = new URLSearchParams();
  formData.append("username", data.username);
  formData.append("password", data.password);

  const response = await client.post<SignInResponse>(
    "/auth/jwt/login",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
}
