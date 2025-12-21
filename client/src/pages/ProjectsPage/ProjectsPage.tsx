import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "@router/routes";

import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { getProjectsAsync } from "../../store/features/projects";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import "./ProjectsPage.scss";

const ProjectsPage = () => {
  const [search, setSearch] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");
  const { data: projects } = useAppSelector((state) => state.projects);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProjectsAsync());
  }, [dispatch]);

  const handleClick = (projectId: string) => {
    navigate(`/tasks/${projectId}`);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredProjects = useMemo(
    () =>
      projects
        .filter((project) => project.title.toLowerCase().includes(search))
        .filter((project) =>
          priorityFilter === "ALL" ? true : project.priority === priorityFilter
        ),
    [projects, search, priorityFilter]
  );

  return (
    <div className="ProjectsPage">
      <div className="FiltersBar">
        <input
          type="text"
          value={search}
          onInput={handleSearchInput}
          placeholder="Search project..."
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="ALL">Все приоритеты</option>
          <option value="HIGH">Высокий</option>
          <option value="MEDIUM">Средний</option>
          <option value="LOW">Низкий</option>
        </select>
      </div>

      <button
        type="button"
        className="AddProjectBtn"
        onClick={() => navigate(APP_ROUTES.NEW_PROJECT_URL)}
      >
        + Add Project
      </button>

      <div className="Projects">
        {filteredProjects.length === 0 && (
          <span className="EmptyMessage">No projects available</span>
        )}

        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} {...project} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
