import { useNavigate } from "react-router";
import { capitalizeFirstLetter } from "@helpers/dom";
import { APP_ROUTES } from "@router/routes";

import { deleteTaskAsync } from "../../store/features/tasks";
import { useAppDispatch } from "../../store/hooks";
import PriorityLabel from "../PriorityLabel/PriorityLabel";

import { TaskCardProps } from "./TaskCard.types";

import "./TaskCard.scss";

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
    <div className="TaskCard">
      <div className="TaskCard-header">
        <h3>{title}</h3>

        <div className="TaskCard-actions">
          <button
            className="TaskCard-edit"
            aria-label="Edit task"
            onClick={handleEditTask}
          >
            ✎
          </button>

          <button
            className="TaskCard-delete"
            onClick={handleDeleteTask}
            aria-label="Delete task"
          >
            ✕
          </button>
        </div>
      </div>

      <PriorityLabel priority={priority} />
      <p>{description.slice(0, 100)}</p>
      <div>Status: {capitalizeFirstLetter(status)}</div>
    </div>
  );
}
