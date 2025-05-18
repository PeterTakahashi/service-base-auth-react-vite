import type { components } from "@/types/api/base";

export type SignInRequestBody =
  components["schemas"]["Body_auth_jwt_login_auth_jwt_login_post"];

export type SignInResponse = components["schemas"]["BearerResponse"];
