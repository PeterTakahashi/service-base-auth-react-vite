import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getAccessTokenFromCookie } from "@/lib/getAccessTokenFromCookie";
type PublicOnlyRouteProps = {
  children: ReactNode;
};

export const PublicOnlyRoute: FC<PublicOnlyRouteProps> = ({ children }) => {
  const accessToken = getAccessTokenFromCookie();

  if (accessToken) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
