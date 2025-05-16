import type { FC } from "react";
import { useCallback } from "react";
import {
  type ForgotPasswordValues,
  ForgotPasswordForm,
} from "@/components/forms/ForgotPasswordForm";

export const ForgotPasswordPage: FC = () => {
  const onSubmit = useCallback(async (values: ForgotPasswordValues) => {
    console.log("Forgot password values", values);
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Reset your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <ForgotPasswordForm onSubmit={onSubmit} />

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Remembered your password?{" "}
          <a
            href="/signin"
            className="font-semibold text-teal-600 hover:text-teal-500"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};
