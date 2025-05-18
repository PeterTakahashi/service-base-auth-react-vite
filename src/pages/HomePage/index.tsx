import type { FC } from "react";
import { useVerifiedUser } from "@/features/hooks/swr/fetcher/user/useVerifiedUser";
import { useLogout } from "@/features/hooks/form/auth/useLogout";
import { useNavigate } from "react-router-dom";

export const HomePage: FC = () => {
  const { user, isLoading, isError } = useVerifiedUser();
  const { logout } = useLogout();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading user info...</div>;
  } else if (isError) {
    return <div>Error loading user info...</div>;
  } else if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user.email}!</h1>
      <p className="text-lg text-gray-700">You have verified your account.</p>

      <button
        onClick={() => navigate("/me/edit")}
        className="mt-6 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
      >
        Edit Profile
      </button>
      <button
        onClick={logout}
        className="mt-6 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
      >
        Logout
      </button>
    </div>
  );
};
