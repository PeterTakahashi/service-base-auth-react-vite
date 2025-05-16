import type { FC } from "react";

export const NotFoundPage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold">NotFound</h1>
      <p className="text-lg text-gray-700 mb-4">404</p>
      <p className="text-lg text-gray-700">This page does not exist.</p>
      <p className="text-lg text-gray-700">
        Go back to{" "}
        <a href="/" className="font-semibold text-teal-600 hover:text-teal-500">
          Home
        </a>
      </p>
    </div>
  );
};
