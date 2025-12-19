import { ReactNode } from "react";
import { Navigate } from "react-router";

import { useAppSelector } from "../store/hooks";

import { urls } from "./menu";

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
