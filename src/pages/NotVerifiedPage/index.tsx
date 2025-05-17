import { type FC } from "react";
import { useRequestVerification } from "@/features/hooks/auth/useRequestVerification";
import { logout } from "@/lib/auth/logout";

export const NotVerifiedPage: FC = () => {
  const { user, isLoading, isError, isMailSent, errorMessage } =
    useRequestVerification();

  if (isLoading) {
    return <div>Loading user info...</div>;
  } else if (isError) {
    return <div>Error loading user info...</div>;
  } else if (!user) {
    return null;
  } else if (user.is_verified) {
    window.location.href = "/";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        Your account is not verified yet!
      </h1>
      {isMailSent ? (
        <p className="text-green-600">
          Verification email sent. Please check your inbox.
        </p>
      ) : (
        <p>Sending verification email...</p>
      )}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
      >
        Logout
      </button>
    </div>
  );
};
