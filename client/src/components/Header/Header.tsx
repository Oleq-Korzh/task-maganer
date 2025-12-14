import AuthSidebar from "../AuthForm/AuthSidebar";
import Menu from "../Menu/Menu";
import "./Header.css";
import { useAppSelector } from "../../store/hooks";

export default function Header() {
  const { isAuth, user } = useAppSelector((state) => state.auth);

  return (
    <div className="Header">
      <Menu />
      {isAuth && <AuthSidebar user={user} />}
    </div>
  );
}
