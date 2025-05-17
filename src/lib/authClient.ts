import { getAccessTokenFromCookie } from "@/lib/getAccessTokenFromCookie";
import { client } from "@/lib/client";

client.interceptors.request.use((config) => {
  const token = getAccessTokenFromCookie("access_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { client as authClient };
