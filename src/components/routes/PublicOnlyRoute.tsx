import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getTokenFromCookie } from "@/lib/auth";
type PublicOnlyRouteProps = {
  children: ReactNode;
};

export const PublicOnlyRoute: FC<PublicOnlyRouteProps> = ({ children }) => {
  const token = getTokenFromCookie();

  if (token) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
