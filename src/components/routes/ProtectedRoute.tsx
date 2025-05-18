import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getAccessTokenFromCookie } from "@/lib/auth/getAccessTokenFromCookie";
import { useUser } from "@/features/hooks/swr/fetcher/user/useUser";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = getAccessTokenFromCookie();
  const { user, isLoading, isError } = useUser();

  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error loading user data</div>;
  } else if (!user) {
    return;
  }
  return <>{children}</>;
};
