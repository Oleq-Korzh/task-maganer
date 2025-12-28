import { useNavigate } from "react-router";
import { APP_ROUTES } from "@router/routes";
import { logoutAsync } from "@store/features/auth/auth";
import { useAppDispatch } from "@store/hooks";

import { AuthSidebarProps } from "./AuthSidebar.types";

import "./AuthSidebar.scss";

const AuthSidebar = ({ user }: AuthSidebarProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAsync());
    navigate(APP_ROUTES.AUTH);
  };

  return (
    <div>
      <span>
        <b>User:</b> {user?.name} / <b>Role:</b> {user?.role}
      </span>
      <span className="logout" onClick={handleLogout}>
        Logout
      </span>
    </div>
  );
};

export default AuthSidebar;
