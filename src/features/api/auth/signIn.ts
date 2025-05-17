import type { components } from "@/types/api";
import client from "@/lib/client";

export type SignInRequestBody =
  components["schemas"]["Body_auth_jwt_login_auth_jwt_login_post"];

type SignInResponse = components["schemas"]["BearerResponse"];

export async function signIn(data: SignInRequestBody): Promise<SignInResponse> {
  const formData = new URLSearchParams();
  formData.append("username", data.username);
  formData.append("password", data.password);

  const response = await client.post<SignInResponse>(
    "/auth/jwt/login",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
}
