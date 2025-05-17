import { client } from "@/lib/client";
import type { SignUpRequestBody } from "@/types/api/signup";
import type { UserRead } from "@/types/api/user";

export async function signUp(data: SignUpRequestBody): Promise<UserRead> {
  const response = await client.post<UserRead>(
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
