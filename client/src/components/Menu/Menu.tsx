import { Link } from "react-router";

import { menuItems } from "../../router/menu";
import { useAppSelector } from "../../store/hooks";

import "./Menu.css";

export default function Menu() {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <nav>
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
}
