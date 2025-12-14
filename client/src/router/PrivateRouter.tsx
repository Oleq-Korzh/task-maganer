import { Navigate } from "react-router";
import { urls } from "./menu";
import { useAppSelector } from "../store/hooks";
import { ReactNode } from "react";

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
