import { type FC } from "react";
import { useRequestVerification } from "@/features/hooks/form/auth/useRequestVerification";
import { useLogout } from "@/features/hooks/form/auth/useLogout";

export const NotVerifiedPage: FC = () => {
  const { user, isLoading, isError, errorMessage } = useRequestVerification();
  const { logout } = useLogout();

  if (isLoading) {
    return <div>Loading user info...</div>;
  } else if (isError) {
    return <div>Error loading user info...</div>;
  } else if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        Your account is not verified yet!
      </h1>
      <p className="text-green-600">
        Verification email sent. Please check your inbox.
      </p>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      <div className="mt-16 text-center text-sm/6 text-gray-500">
        <div>
          Did you receive the email?{" "}
          <a
            href=""
            className="font-semibold text-teal-600 hover:text-teal-500"
          >
            Resend verification email
          </a>
        </div>
      </div>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
      >
        Logout
      </button>
    </div>
  );
};
