import { client } from "@/lib/client";

export async function requestVerifyToken(email: string) {
  // エラー処理など適宜追加してください
  const response = await client.post("/auth/request-verify-token", { email });
  return response.data;
}
