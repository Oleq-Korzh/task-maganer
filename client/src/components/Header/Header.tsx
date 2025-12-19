import { useAppSelector } from "../../store/hooks";
import AuthSidebar from "../AuthForm/AuthSidebar";
import Menu from "../Menu/Menu";

import "./Header.css";

export default function Header() {
  const { isAuth, user } = useAppSelector((state) => state.auth);

  return (
    <div className="Header">
      <Menu />
      {isAuth && <AuthSidebar user={user} />}
    </div>
  );
}
