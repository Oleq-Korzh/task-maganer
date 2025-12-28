import { useNavigate } from "react-router";
import { APP_ROUTES } from "@router/routes";

import { deleteProjectAsync } from "../../store/features/projects/projects";
import { useAppDispatch } from "../../store/hooks";
import PriorityLabel from "../PriorityLabel/PriorityLabel";

import { ProjectCardProps } from "./ProjectCard.types";

import styles from "./ProjectCard.module.scss";

const ProjectCard = ({
  id,
  title,
  description,
  priority,
  onClick,
}: ProjectCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    </div>
  );
};

export default ProjectCard;
