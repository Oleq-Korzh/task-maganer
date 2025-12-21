import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  DEFAULT_TASK_PRIORITY,
  TASKS_PRIORITIES,
} from "@constants/taskPriorities";
import { DEFAULT_TASK_STATUS, TASK_STATUS } from "@constants/taskStatus";
import {
  TaskFormProps,
  TaskPriotiryProps,
  TaskStatusProps,
} from "@models/task.types";
import { APP_ROUTES } from "@router/routes";

import { getProjectsAsync } from "../../store/features/projects";
import { saveTaskAsync } from "../../store/features/tasks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import "./NewTaskPage.scss";

const NewTaskPage = () => {
  const { projectId } = useParams<"projectId">();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: projects } = useAppSelector((state) => state.projects);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<TaskPriotiryProps>(
    DEFAULT_TASK_PRIORITY
  );
  const [status, setStatus] = useState<TaskStatusProps>(DEFAULT_TASK_STATUS);
  const [assignee, setAssignee] = useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projectId || ""
  );
  const currentProject = projects.find((project) => project.id === projectId);

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(getProjectsAsync());
    }
  }, [projects, dispatch]);

  const handleSave = () => {
    if (!title.trim() || !description.trim() || !selectedProjectId) return;

    const newTask: TaskFormProps = {
      title,
      description,
      priority,
      status,
      assignee,
      projectId: selectedProjectId,
    };

    dispatch(saveTaskAsync(newTask));
    navigate(
      `${APP_ROUTES.SINGLE_PROJECT.replace(":projectId", selectedProjectId)}`
    );
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleInputDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSelectPriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as TaskPriotiryProps);
  };

  const handleSelectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as TaskStatusProps);
  };

  const handleSelectProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProjectId(e.target.value);
  };

  const handleInputAssignee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssignee(e.target.value);
  };

  return (
    <div className="AddTaskPage">
      <h2>
        Добавить задачу{" "}
        {currentProject && <span>для проекта {currentProject?.title}</span>}
      </h2>

      <div className="Form">
        <input
          type="text"
          placeholder="Название задачи"
          value={title}
          onInput={handleInputTitle}
        />

        <textarea
          placeholder="Описание"
          value={description}
          onInput={handleInputDesc}
        />

        <input
          type="text"
          placeholder="Исполнитель"
          value={assignee}
          onInput={handleInputAssignee}
        />

        <label>Приоритет</label>
        <select value={priority} onChange={handleSelectPriority}>
          {Object.entries(TASKS_PRIORITIES).map(([key, priority]) => (
            <option key={key} value={key}>
              {priority}
            </option>
          ))}
        </select>

        <label>Статус</label>
        <select value={status} onChange={handleSelectStatus}>
          {Object.entries(TASK_STATUS).map(([key, status]) => {
            return (
              <option key={key} value={key?.toLowerCase()}>
                {status}
              </option>
            );
          })}
        </select>

        {!projectId && (
          <>
            <label>Проект</label>
            <select value={selectedProjectId} onChange={handleSelectProject}>
              <option value="">Выберите проект…</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </>
        )}

        <button className="SaveBtn" type="button" onClick={handleSave}>
          Создать задачу
        </button>

        <button className="BackBtn" onClick={handleBackButton}>
          Назад
        </button>
      </div>
    </div>
  );
};

export default NewTaskPage;
