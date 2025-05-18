import { type FC } from "react";
import { useVerifyToken } from "@/features/hooks/form/auth/useVerifyToken";

export const VerifyTokenPage: FC = () => {
  useVerifyToken();

  return null;
};
