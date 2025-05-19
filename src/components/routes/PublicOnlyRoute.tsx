import type { FC, ReactNode } from "react";

type PublicOnlyRouteProps = {
  children: ReactNode;
};

export const PublicOnlyRoute: FC<PublicOnlyRouteProps> = ({ children }) => {
  return <>{children}</>;
};
