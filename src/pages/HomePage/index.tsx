import type { FC } from "react";
import { useCallback } from "react";

export const HomePage: FC = () => {
  const logout = useCallback(() => {
    document.cookie = "token=;path=/;";
    window.location.href = "/signin"; // Redirect to the sign-in page
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
      <p className="text-lg text-gray-700">This is a simple home page.</p>

      <button
        onClick={logout}
        className="mt-6 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
      >
        Logout
      </button>
    </div>
  );
};
