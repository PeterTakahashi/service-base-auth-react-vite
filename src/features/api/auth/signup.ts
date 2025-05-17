import type { components } from "@/types/api";
import { client } from "@/lib/client";

export type SignUpRequestBody = components["schemas"]["UserCreate"];

type SignUpResponse = components["schemas"]["BearerResponse"];

export async function signUp(data: SignUpRequestBody): Promise<SignUpResponse> {
  const response = await client.post<SignUpResponse>(
    "/auth/register/register",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}
