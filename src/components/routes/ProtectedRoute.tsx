import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getTokenFromCookie } from "@/lib/auth";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const token = getTokenFromCookie();
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return <>{children}</>;
};
