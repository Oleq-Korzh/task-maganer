import { ReactNode } from "react";
import { Navigate } from "react-router";

import { useAppSelector } from "../store/hooks";

import { urls } from "./menu";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuth, loaded } = useAppSelector((state) => state.auth);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    return <Navigate to={urls.AUTH} replace />;
  }

  return children;
}
