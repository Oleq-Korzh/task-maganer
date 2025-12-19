import { useNavigate } from "react-router";

import { urls } from "../../router/menu";
import { logoutAsync } from "../../store/features/auth";
import { useAppDispatch } from "../../store/hooks";

import "./AuthSidebar.css";

import { AuthSidebarProps } from "./AuthSidebar.types";

export default function AuthSidebar({ user }: AuthSidebarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAsync());
    navigate(urls.AUTH);
  };

  return (
    <div>
      <span>
        <b>User:</b> {user?.name} / <b>Role:</b> {user?.role}
      </span>
      <span className="logout" onClick={handleLogout}>
        Выйти
      </span>
    </div>
  );
}
