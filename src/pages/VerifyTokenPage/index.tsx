import { type FC } from "react";
import { useParams } from "react-router-dom";

export const VerifyTokenPage: FC = () => {
  const { token } = useParams<{ token: string }>();

  return <div>{token}</div>;
};
