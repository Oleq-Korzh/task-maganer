import { UserInfoTypes } from "./UserInfoSmall.types";

import styles from "./UserInfoSmall.module.scss";

const UserInfoSmall = ({ name, avatarUrl }: UserInfoTypes) => {
  return (
    <div className={styles.user}>
      <img src={avatarUrl} alt={name} className={styles.avatar} />

      <div className={styles.info}>
        <span className={styles.name} title={name}>
          {name}
        </span>
      </div>
    </div>
  );
};

export default UserInfoSmall;
