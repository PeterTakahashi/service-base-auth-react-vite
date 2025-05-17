import { authClient } from "@/lib/authClient";

export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await authClient.get<T>(url);
  return res.data;
};
