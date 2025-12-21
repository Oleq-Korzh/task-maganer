import { Navigate } from "react-router";

import { useAppSelector } from "../store/hooks";

import { CustomRouterProps } from "./types/router.types";
import { APP_ROUTES } from "./routes";

export default function ProtectedRoute({ children }: CustomRouterProps) {
  const { isAuth, loaded } = useAppSelector((state) => state.auth);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    return <Navigate to={APP_ROUTES.AUTH} replace />;
  }

  return children;
}
