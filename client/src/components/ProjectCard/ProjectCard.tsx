import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { urls } from "../../router/menu";
import { deleteProjectAsync } from "../../store/features/projects";
import { useAppDispatch } from "../../store/hooks";
import PriorityLabel from "../PriorityLabel/PriorityLabel";

import "./ProjectCard.css";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  onClick?: (id: string) => void;
}

export default function ProjectCard({
  id,
  title,
  description,
  priority,
  onClick,
}: ProjectCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    onClick && onClick(id);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(deleteProjectAsync(id));
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    id && navigate(urls.EDIT_PROJECT.replace(":id", id));
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
}
