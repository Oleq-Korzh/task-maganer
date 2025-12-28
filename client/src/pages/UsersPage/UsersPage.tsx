import { useEffect } from "react";
import { getUsersAsync } from "@store/features/users";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import "./UsersPage.scss";

const UsersPage = () => {
  const { data: users, isInit } = useAppSelector((store) => store.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isInit) {
      dispatch(getUsersAsync());
    }
  }, [isInit, dispatch]);

  return (
    <div className="users-page">
      <h1 className="users-page__title">Users</h1>

      <ul className="users-list">
        {users.map((user) => (
          <li key={user.id} className="users-list__item">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="users-list__avatar"
            />

            <div className="users-list__info">
              <div className="users-list__name">{user.name}</div>
              <div className="users-list__meta">
                <span
                  className={`users-list__role users-list__role--${user.role}`}
                >
                  {user.role}
                </span>

                <span className="users-list__projects">
                  Projects: {user?.projects?.length || "—"}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
