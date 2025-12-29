import { UserCardProps } from "./UserCard.types";

import "./UserCard.scss";

const UserCard = ({ id, avatarUrl, name, role }: UserCardProps) => {
  return (
    <li key={id} className="users-list__item">
      <img src={avatarUrl} alt={name} className="users-list__avatar" />

      <div className="users-list__info">
        <div className="users-list__name">{name}</div>
        <div className="users-list__meta">
          <span className={`users-list__role users-list__role--${role}`}>
            {role}
          </span>
        </div>
      </div>
    </li>
  );
};

export default UserCard;
