import { useMemo, useState } from "react";
import Snowfall from "react-snowfall";
import UserCard from "@components/UserCard/UserCard";
import { USER_ROLES } from "@constants/userRoles";
import { capitalizeFirstLetter } from "@helpers/dom";
import { selectAllUsers } from "@store/features/users/users.selector";
import { useAppSelector } from "@store/hooks";

import "./UsersPage.scss";

const UsersPage = () => {
  const [filterRole, setFilterRole] = useState<string>("ALL");
  const users = useAppSelector(selectAllUsers);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return filterRole === "ALL" ? user : user.role === filterRole;
    });
  }, [users, filterRole]);

  return (
    <div className="users-page">
      <Snowfall color="lightblue" snowflakeCount={200} />
      <h1 className="users-page__title">Users</h1>
      <div className="users-page__filter">
        <select
          className="users-page__select"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="ALL">All roles</option>
          {Object.values(USER_ROLES).map((role) => (
            <option value={role} key={role}>
              {capitalizeFirstLetter(role)}
            </option>
          ))}
        </select>
      </div>
      <ul className="users-list">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
