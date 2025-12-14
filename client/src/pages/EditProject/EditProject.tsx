import { useParams, useNavigate } from "react-router";
import "./EditProject.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  editProjectAsync,
  getProjectsAsync,
} from "../../store/features/projects";
import { urls } from "../../router/menu";
import { PRIORITIES } from "../../common/priorities";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const EditProject = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data: projects } = useAppSelector((state) => state.projects);
  const project = projects.find((project) => project.id === id);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<"HIGH" | "MEDIUM" | "LOW">("HIGH");

  useEffect(() => {
    if (!project) {
      dispatch(getProjectsAsync());
    }
  }, [project, dispatch]);

  useEffect(() => {
    if (!project) return;

    setTitle(project?.title ?? "");
    setDescription(project?.description ?? "");
    setPriority(project.priority.toUpperCase() as "HIGH" | "MEDIUM" | "LOW");
  }, [project]);

  const handleReturnToProjects = () => {
    navigate(urls.PROJECTS_URL);
  };

  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleInputDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as "HIGH" | "MEDIUM" | "LOW");
  };

  const handleSave = () => {
    if (!id || !project) return;

    if (title.trim() !== "" && description.trim() !== "") {
      dispatch(
        editProjectAsync({
          id: project.id,
          payload: { title, description, priority },
        })
      );
      handleReturnToProjects();
    }
  };

  return (
    <div className="EditProject">
      <button className="back-button" onClick={handleReturnToProjects}>
        ← Вернуться на все проекты
      </button>

      <h2>Редактировать проект</h2>

      <form>
        <div>
          <input
            value={title}
            type="text"
            name="title"
            placeholder="Введите название проекта"
            onInput={handleInputTitle}
          />
        </div>

        <div>
          <textarea
            value={description}
            name="description"
            placeholder="Введите описание проекта"
            onInput={handleInputDesc}
          ></textarea>
        </div>

        <div>
          <label className="priority-label">Приоритет:</label>
          <select name="priority" value={priority} onChange={handleSelect}>
            {Object.entries(PRIORITIES).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <button type="button" className="save-btn" onClick={handleSave}>
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default EditProject;
