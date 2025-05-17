import type { FC } from "react";

export const SentResetPasswordMailPage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Check your email</h1>
      <p className="mt-4 text-lg">
        We have sent you an email with a link to reset your password.
      </p>
      <div className="mt-10 text-center text-sm/6 text-gray-500">
        If you remenber your password,{" "}
        <a
          href="/signin"
          className="font-semibold text-teal-600 hover:text-teal-500"
        >
          Sign in
        </a>
      </div>
    </div>
  );
};
