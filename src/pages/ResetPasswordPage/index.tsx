import type { FC } from "react";
import { ResetPasswordForm } from "@/components/forms/ResetPasswordForm";
import { useResetPasswordForm } from "@/features/hooks/form/auth/useResetPasswordForm";

export const ResetPasswordPage: FC = () => {
  const { onSubmitResetPassword, errorMessage } = useResetPasswordForm();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Reset your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <ResetPasswordForm onSubmit={onSubmitResetPassword} />

        {errorMessage && (
          <p className="mt-4 text-center text-sm text-red-600">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};
