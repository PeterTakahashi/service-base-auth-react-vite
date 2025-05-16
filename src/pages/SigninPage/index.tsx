import type { FC } from "react";
import { AuthForm } from "@/components/forms/AuthForm";

export const SigninPage: FC = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <AuthForm mode="signin" />

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          No account yet?{" "}
          <a
            href="/signup"
            className="font-semibold text-teal-600 hover:text-teal-500"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
