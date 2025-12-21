import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DEFAULT_PROJECT_PRIORITY } from "@constants/projectPriorities";
import { TASKS_PRIORITIES } from "@constants/taskPriorities";
import { ProjectFormTypes, ProjectPriotiryProps } from "@models/project.types";
import { APP_ROUTES } from "@router/routes";

import {
  editProjectAsync,
  getProjectsAsync,
} from "../../store/features/projects";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import "./EditProject.scss";

const EditProject = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const { data: projects } = useAppSelector((state) => state.projects);

  const project = useMemo(
    () => projects.find((p) => p.id === id),
    [projects, id]
  );

  useEffect(() => {
    if (!projects.length) {
      dispatch(getProjectsAsync());
    }
  }, [projects.length, dispatch]);

  const [form, setForm] = useState<ProjectFormTypes>(() => ({
    title: project?.title ?? "",
    description: project?.description ?? "",
    priority: project?.priority ?? DEFAULT_PROJECT_PRIORITY,
  }));

  const updateForm =
    <K extends keyof ProjectFormTypes>(key: K) =>
    (value: ProjectFormTypes[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  const handleSave = () => {
    if (!id) return;

    const { title, description } = form;

    if (!title.trim() || !description.trim()) return;

    dispatch(editProjectAsync({ id, payload: form }));
    navigate(APP_ROUTES.PROJECTS_URL);
  };

  const handleBack = () => {
    navigate(APP_ROUTES.PROJECTS_URL);
  };

  if (!project) {
    return <p>Загрузка проекта...</p>;
  }

  return (
    <div className="EditProject">
      <button className="back-button" onClick={handleBack}>
        ← Вернуться на все проекты
      </button>

      <h2>Редактировать проект</h2>

      <form>
        <div>
          <input
            type="text"
            placeholder="Введите название проекта"
            value={form.title}
            onChange={(e) => updateForm("title")(e.target.value)}
          />
        </div>

        <div>
          <textarea
            placeholder="Введите описание проекта"
            value={form.description}
            onChange={(e) => updateForm("description")(e.target.value)}
          />
        </div>

        <div>
          <label className="priority-label">Приоритет:</label>
          <select
            value={form.priority}
            onChange={(e) =>
              updateForm("priority")(e.target.value as ProjectPriotiryProps)
            }
          >
            {Object.entries(TASKS_PRIORITIES).map(([key, value]) => (
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
