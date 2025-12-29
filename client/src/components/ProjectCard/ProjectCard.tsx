import { useNavigate } from "react-router";
import UserInfoSmall from "@components/UserInfoSmall/UserInfoSmall";
import { APP_ROUTES } from "@router/routes";
import { selectUserById } from "@store/features/users/users.selector";

import { deleteProjectAsync } from "../../store/features/projects/projects";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import PriorityLabel from "../PriorityLabel/PriorityLabel";

import { ProjectCardProps } from "./ProjectCard.types";

import styles from "./ProjectCard.module.scss";

const ProjectCard = ({
  id,
  title,
  description,
  priority,
  creatorId,
  onClick,
}: ProjectCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const findUser = useAppSelector((state) =>
    creatorId ? selectUserById(state, creatorId) : undefined
  );

  console.log();

  const handleClick = () => {
    if (!onClick) {
      return;
    }

    onClick(id);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(deleteProjectAsync(id));
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!id) {
      return;
    }

    navigate(APP_ROUTES.EDIT_PROJECT.replace(":id", id));
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.header}>
        <h3>{title}</h3>

        <div className={styles.actions}>
          <button
            className={styles.edit}
            aria-label="Edit project"
            onClick={handleEdit}
          >
            ✎
          </button>

          <button
            className={styles.delete}
            onClick={handleDelete}
            aria-label="Delete project"
          >
            ✕
          </button>
        </div>
      </div>

      <PriorityLabel priority={priority} />
      <p className={styles.description}>{description}</p>
      {findUser && (
        <div>
          <div>
            <b>Creator:</b>
          </div>
          <UserInfoSmall {...findUser} />
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
