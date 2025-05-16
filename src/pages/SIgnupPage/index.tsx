import type { FC } from "react";
import { AuthForm, type SignUpValues } from "@/components/forms/AuthForm";
import { signUp, type SignUpRequestBody } from "@/api/auth/signup";

export const SignupPage: FC = () => {
  const onSubmitSignUp = async (data: SignUpValues) => {
    try {
      const requestBody: SignUpRequestBody = {
        email: data.email,
        password: data.password,
      };
      const response = await signUp(requestBody);
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
          Sign up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <AuthForm mode="signup" onSubmit={onSubmitSignUp} />

        <div className="mt-10 text-center text-sm/6 text-gray-500">
          if you already have an account,{" "}
          <a
            href="/signin"
            className="font-semibold text-teal-600 hover:text-teal-500"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};
