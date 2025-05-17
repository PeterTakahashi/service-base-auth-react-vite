import type { ForgotPasswordRequestBody } from "@/types/api/forgotPassword";
import { client } from "@/lib/client";

export async function forgotPassword(
  data: ForgotPasswordRequestBody
): Promise<void> {
  await client.post("/auth/forgot-password", data);
}
