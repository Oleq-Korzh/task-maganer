import { ReactNode } from "react";
import { Navigate } from "react-router";
import { urls } from "./menu";
import { useAppSelector } from "../store/hooks";

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { isAuth } = useAppSelector((state) => state.auth);

  if (isAuth) {
    return <Navigate to={urls.PROJECTS_URL} replace />;
  }

  return children;
}
