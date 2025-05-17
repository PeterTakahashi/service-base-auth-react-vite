import type { FC } from "react";
import { AuthForm } from "@/components/forms/AuthForm";
import { useSignIn } from "@/features/hooks/auth/useSignIn";

export const SigninPage: FC = () => {
  const { onSubmitSignIn, errorMessage } = useSignIn();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <AuthForm mode="signin" onSubmit={onSubmitSignIn} />

        {errorMessage && (
          <p className="mt-4 text-center text-sm text-red-600">
            {errorMessage}
          </p>
        )}

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
