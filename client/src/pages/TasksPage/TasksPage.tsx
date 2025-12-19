import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useParams } from "react-router";

import TaskCard from "../../components/TaskCard/TaskCard";
import { urls } from "../../router/menu";
import { getTasksAsync } from "../../store/features/tasks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import "./TasksPage.css";

import { ParamsTypes, Task } from "./TaskPage.types";

export default function TasksPage() {
  const [filterDate, setFilterDate] = useState("NEW");
  const { data: tasks } = useAppSelector((state) => state.tasks);
  const { projectId } = useParams<ParamsTypes>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTasksAsync(projectId));
  }, [dispatch, projectId]);

  const handleBackPage = () => {
    navigate(urls.PROJECTS_URL);
  };

  const handleAddNewProject = () => {
    if (projectId) {
      navigate(
        `${urls.NEW_TASK_IN_PROJECT_URL.replace(":projectId", projectId)}`
      );
    } else {
      navigate(urls.NEW_TASK_URL);
    }
  };

  const filteredTasks = useMemo<Task[]>(() => {
    const filtered = projectId
      ? tasks.filter((task) => task.projectId === projectId)
      : tasks;

    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return filterDate === "OLD"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
  }, [tasks, filterDate, projectId]);

  return (
    <div className="TasksPage">
      <div className="BackBtn" onClick={handleBackPage}>
        Все проекты
      </div>

      <div className="TopPanel">
        <div className="Filters">
          <select
            className="FilterSelect"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          >
            <option value="NEW">Сначала новые</option>
            <option value="OLD">Сначала старые</option>
          </select>
        </div>

        <button className="AddTaskBtn" onClick={handleAddNewProject}>
          + Create new task
        </button>
      </div>

      {filteredTasks.length === 0 && (
        <span className="Empty">No tasks available</span>
      )}

      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          {...task}
          priority={task.priority as "HIGH" | "MEDIUM" | "LOW"}
        />
      ))}
    </div>
  );
}
