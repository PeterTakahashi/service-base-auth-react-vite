import { authClient } from "@/lib/authClient";

export async function requestVerifyToken(email: string): Promise<void> {
  await authClient.post("/auth/request-verify-token", { email });
}
