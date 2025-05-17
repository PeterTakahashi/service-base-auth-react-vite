import type { FC } from "react";

export const SentResetPasswordMailPage: FC = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Check your email
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="mt-4 text-center text-sm text-gray-500">
          We have sent you an email with a link to reset your password.
        </p>

        <div className="mt-10 text-center text-sm/6 text-gray-500">
          <div>
            Remembered your password?{" "}
            <a
              href="/signin"
              className="font-semibold text-teal-600 hover:text-teal-500"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
