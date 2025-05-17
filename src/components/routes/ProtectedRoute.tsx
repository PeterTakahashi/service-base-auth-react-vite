import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getAccessTokenFromCookie } from "@/lib/getAccessTokenFromCookie";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = getAccessTokenFromCookie();
  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }
  return <>{children}</>;
};
