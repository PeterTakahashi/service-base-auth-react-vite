import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getAccessTokenFromCookie } from "@/lib/auth/getAccessTokenFromCookie";
import { useUser } from "@/features/hooks/swr/fetcher/user/useUser";
import { Loading } from "@/components/ui/Loading";
import { ErrorDisplay } from "@/components/ui/ErrorDisplay";

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
    return <Loading />;
  } else if (isError) {
    return <ErrorDisplay status={404} errorMessage="User is not found " />;
  } else if (!user) {
    return;
  }
  return <>{children}</>;
};
