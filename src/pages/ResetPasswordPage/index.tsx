import type { FC } from "react";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  type ResetPasswordValues,
  ResetPasswordForm,
} from "@/components/forms/ResetPasswordForm";

export const ResetPasswordPage: FC = () => {
  const { token } = useParams<{ token: string }>();

  const onSubmit = useCallback(
    async (values: ResetPasswordValues) => {
      console.log("Forgot password values", values);
      console.log("Token from path:", token);
    },
    [token]
  );

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Reset your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <ResetPasswordForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};
