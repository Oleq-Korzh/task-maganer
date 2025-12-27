import { useAppSelector } from "../../store/hooks";
import AuthSidebar from "../AuthForm/AuthSidebar";
import Menu from "../Menu/Menu";

import styles from "./Header.module.scss";

const Header = () => {
  const { isAuth, user } = useAppSelector((state) => state.auth);

  return (
    <div className={styles.Header}>
      <Menu />
      {isAuth && <AuthSidebar user={user} />}
    </div>
  );
};

export default Header;
