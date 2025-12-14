import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import "./EdiTask.css";
import {
  editTaskAsync,
  getTasksAsync,
  saveTaskAsync,
} from "../../store/features/tasks";
import { urls } from "../../router/menu";
import { getProjectsAsync } from "../../store/features/projects";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Task } from "./EditTask.types";

// Лучше создам отдельно от проектов, мало ли приоритетов у задач будет больше

const TASKS_PRIORITIES = {
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
};

const TASKS_STATUS = {
  todo: "Todo",
  "in-progress": "In-progress",
  done: "Done",
  blocked: "Blocked",
};

const EditTask = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<string>("LOW");
  const [status, setStatus] = useState<string>("todo");
  const [assignee, setAssignee] = useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const { data: projects } = useAppSelector((state) => state.projects);
  const { data: tasks } = useAppSelector((state) => state.tasks);
  const currentTask = tasks.find((task) => task.id === id);

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(getProjectsAsync());
    }
  }, [projects, dispatch]);

  useEffect(() => {
    if (!currentTask) {
      dispatch(getTasksAsync());
    }
  }, [currentTask, dispatch]);

  useEffect(() => {
    setTitle(currentTask?.title ?? "");
    setDescription(currentTask?.description ?? "");
    setPriority(currentTask?.priority ?? "LOW");
    setStatus(currentTask?.status ?? "todo");
    setAssignee(currentTask?.assignee ?? "");
    setSelectedProjectId(currentTask?.projectId ?? "");
  }, [currentTask]);

  const handleSave = () => {
    if (!id) return;

    const updatedTask: Partial<Task> = {
      title,
      description,
      priority,
      status,
      assignee,
      projectId: selectedProjectId,
    };

    dispatch(editTaskAsync({ id, payload: updatedTask }));
    navigate(`${urls.SINGLE_PROJECT.replace(":projectId", selectedProjectId)}`);
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
    setPriority(e.target.value);
  };

  const handleSelectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
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
        Изменить задачу{" "}
        {currentTask?.title && <span>{currentTask?.title}</span>}
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
          {Object.entries(TASKS_STATUS).map(([key, status]) => (
            <option key={key} value={key}>
              {status}
            </option>
          ))}
        </select>

        <label>Проект</label>
        <select value={selectedProjectId} onChange={handleSelectProject}>
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
