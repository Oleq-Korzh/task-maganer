import { Navigate } from "react-router";

import { useAppSelector } from "../store/hooks";

import { CustomRouterProps } from "./types/router.types";
import { APP_ROUTES } from "./routes";

export default function PublicRoute({ children }: CustomRouterProps) {
  const { isAuth } = useAppSelector((state) => state.auth);

  if (isAuth) {
    return <Navigate to={APP_ROUTES.PROJECTS_URL} replace />;
  }

  return children;
}
