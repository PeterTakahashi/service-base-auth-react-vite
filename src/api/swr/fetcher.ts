import client from "@/api/client";

export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await client.get<T>(url);
  return res.data;
};
