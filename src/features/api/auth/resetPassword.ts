import type { ResetPasswordRequestBody } from "@/types/api/resetPassword";
import { client } from "@/lib/client";

export async function resetPassword(
  data: ResetPasswordRequestBody
): Promise<void> {
  await client.post("/auth/reset-password", data);
}
