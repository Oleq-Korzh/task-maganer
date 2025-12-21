import { useNavigate } from "react-router";
import { APP_ROUTES } from "@router/routes";

import { deleteProjectAsync } from "../../store/features/projects";
import { useAppDispatch } from "../../store/hooks";
import PriorityLabel from "../PriorityLabel/PriorityLabel";

import { ProjectCardProps } from "./ProjectCard.types";

import "./ProjectCard.scss";

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
    <div className="ProjectCard" onClick={handleClick}>
      <div className="ProjectCard-header">
        <h3>{title}</h3>

        <div className="ProjectCard-actions">
          <button
            className="ProjectCard-edit"
            aria-label="Edit project"
            onClick={handleEdit}
          >
            ✎
          </button>

          <button
            className="ProjectCard-delete"
            onClick={handleDelete}
            aria-label="Delete project"
          >
            ✕
          </button>
        </div>
      </div>

      <PriorityLabel priority={priority} />
      <p>{description}</p>
    </div>
  );
};

export default ProjectCard;
