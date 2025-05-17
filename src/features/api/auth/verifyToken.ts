import { authClient } from "@/lib/authClient";
import type { verifyTokenRequestBody } from "@/types/api/verifyToken";
import type { UserRead } from "@/types/api/user";

export async function verifyToken({
  token,
}: verifyTokenRequestBody): Promise<UserRead> {
  const response = await authClient.post("/auth/verify", { token });
  return response.data;
}
