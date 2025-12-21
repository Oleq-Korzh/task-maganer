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
import { editTaskAsync, getTasksAsync } from "../../store/features/tasks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import "./EdiTask.scss";

const EditTask = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data: projects } = useAppSelector((state) => state.projects);
  const { data: tasks } = useAppSelector((state) => state.tasks);
  const currentTask = tasks.find((task) => task.id === id);
  const [form, setForm] = useState<TaskFormProps>(() => ({
    title: currentTask?.title ?? "",
    description: currentTask?.description ?? "",
    priority: currentTask?.priority ?? DEFAULT_TASK_PRIORITY,
    status: currentTask?.status ?? DEFAULT_TASK_STATUS,
    assignee: currentTask?.assignee ?? "",
    projectId: currentTask?.projectId ?? "",
  }));

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(getProjectsAsync());
    }
  }, [projects, dispatch]);

  useEffect(() => {
    if (!currentTask) {
      dispatch(getTasksAsync(""));
    }
  }, [currentTask, dispatch]);

  const handleSave = () => {
    if (!id) return;

    dispatch(editTaskAsync({ id, payload: form }));
    navigate(APP_ROUTES.SINGLE_PROJECT.replace(":projectId", form.projectId));
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  const updateForm =
    <K extends keyof TaskFormProps>(key: K) =>
    (value: TaskFormProps[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  return (
    <div className="AddTaskPage">
      <h2>
        Изменить задачу{" "}
        {currentTask?.title && <span>{currentTask?.title}</span>}
      </h2>

      <div className="Form">
        <input
          type="text"
          placeholder="Название задачи"
          value={form.title}
          onChange={(e) => updateForm("title")(e.target.value)}
        />

        <textarea
          placeholder="Описание"
          value={form.description}
          onChange={(e) => updateForm("description")(e.target.value)}
        />

        <input
          type="text"
          placeholder="Исполнитель"
          value={form.assignee}
          onChange={(e) => updateForm("assignee")(e.target.value)}
        />

        <label>Приоритет</label>
        <select
          value={form.priority}
          onChange={(e) =>
            updateForm("priority")(e.target.value as TaskPriotiryProps)
          }
        >
          {Object.entries(TASKS_PRIORITIES).map(([key, priority]) => (
            <option key={key} value={key}>
              {priority}
            </option>
          ))}
        </select>

        <label>Статус</label>
        <select
          value={form.status}
          onChange={(e) =>
            updateForm("status")(e.target.value as TaskStatusProps)
          }
        >
          {Object.entries(TASK_STATUS).map(([key, status]) => (
            <option key={key} value={key}>
              {status}
            </option>
          ))}
        </select>

        <label>Проект</label>
        <select
          value={form.projectId}
          onChange={(e) => updateForm("projectId")(e.target.value)}
        >
          <option value="">Выберите проект…</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>

        <button className="SaveBtn" type="button" onClick={handleSave}>
          Изменить задачу
        </button>

        <button className="BackBtn" onClick={handleBackButton}>
          Назад
        </button>
      </div>
    </div>
  );
};

export default EditTask;
