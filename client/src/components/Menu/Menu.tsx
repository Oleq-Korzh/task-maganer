import { Link } from "react-router";

import { menuItems } from "../../router/menu";
import { useAppSelector } from "../../store/hooks";

import styles from "./Menu.module.scss";

const Menu = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <nav className={styles.menu}>
      <ul>
        {menuItems.map((item) => {
          if (
            item.hideInMenu ||
            (item.protected && !isAuth) ||
            (item.public && isAuth)
          ) {
            return null;
          }

          return (
            <li key={item.path}>
              <Link to={item.path}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
