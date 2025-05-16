import type { FC } from "react";
import { AuthForm, type SignInValues } from "@/components/forms/AuthForm";
import { signIn, type SignInRequestBody } from "@/api/auth/signIn";

export const SigninPage: FC = () => {
  const onSubmitSignIn = async (data: SignInValues) => {
    try {
      const requestBody: SignInRequestBody = {
        username: data.email,
        password: data.password,
        scope: "",
        grant_type: "password",
      };
      const response = await signIn(requestBody);
      document.cookie = `access_token=${response.access_token}; path=/;`;
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <AuthForm mode="signin" onSubmit={onSubmitSignIn} />

        <div className="mt-10 text-center text-sm/6 text-gray-500">
          <div>
            No account yet?{" "}
            <a
              href="/signup"
              className="font-semibold text-teal-600 hover:text-teal-500"
            >
              Sign up
            </a>
          </div>
          <div>
            <a
              href="/forgot-password"
              className="font-semibold text-teal-600 hover:text-teal-500"
            >
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
