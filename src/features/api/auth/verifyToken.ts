import { authClient } from "@/lib/authClient";

export async function verifyToken(token: string): Promise<void> {
  await authClient.post("/auth/verify", { token });
}
