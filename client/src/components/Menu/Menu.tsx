import { menuItems } from "../../router/menu";
import { Link } from "react-router";
import "./Menu.css";
import { useAppSelector } from "../../store/hooks";

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
