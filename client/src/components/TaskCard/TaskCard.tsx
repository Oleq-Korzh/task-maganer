import { useNavigate } from "react-router";
import { capitalizeFirstLetter } from "@helpers/dom";
import { APP_ROUTES } from "@router/routes";

import { deleteTaskAsync } from "../../store/features/tasks/tasks";
import { useAppDispatch } from "../../store/hooks";
import PriorityLabel from "../PriorityLabel/PriorityLabel";

import { TaskCardProps } from "./TaskCard.types";

import styles from "./TaskCard.module.scss";

export default function TaskCard({
  id,
  title,
  description,
  status,
  priority,
}: TaskCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDeleteTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(deleteTaskAsync(id));
  };

  const handleEditTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(APP_ROUTES.EDIT_TASK.replace(":id", String(id)));
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{title}</h3>

        <div className={styles.actions}>
          <button
            className={styles.edit}
            aria-label="Edit task"
            onClick={handleEditTask}
          >
            ✎
          </button>

          <button
            className={styles.delete}
            onClick={handleDeleteTask}
            aria-label="Delete task"
          >
            ✕
          </button>
        </div>
      </div>

      <PriorityLabel priority={priority} />
      <p className={styles.description}>{description.slice(0, 100)}</p>
      <div className={`${styles.status} ${styles[`status--${status}`]}`}>
        Status: {capitalizeFirstLetter(status)}
      </div>
    </div>
  );
}
