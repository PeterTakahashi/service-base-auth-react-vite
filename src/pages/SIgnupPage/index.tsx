import type { FC } from "react";
import { AuthForm } from "@/components/forms/AuthForm";
import { useSignUpForm } from "@/features/hooks/form/auth/useSignUpForm";
import { AuthLayout } from "@/components/layout/AuthLayout";

export const SignupPage: FC = () => {
  const { onSubmitSignUp, errorMessage } = useSignUpForm();

  return (
    <AuthLayout title="Create an account">
      <AuthForm mode="signup" onSubmit={onSubmitSignUp} />

      {errorMessage && (
        <p className="mt-4 text-center text-sm text-red-600">{errorMessage}</p>
      )}

      <div className="mt-10 text-center text-sm/6 text-gray-500">
        If you already have an account,{" "}
        <a
          href="/signin"
          className="font-semibold text-teal-600 hover:text-teal-500"
        >
          Sign in
        </a>
      </div>
    </AuthLayout>
  );
};
