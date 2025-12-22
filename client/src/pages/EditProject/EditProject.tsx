import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { DEFAULT_PROJECT_PRIORITY } from "@constants/projectPriorities";
import { ProjectFormTypes, ProjectPriotiryProps } from "@models/project.types";
import { APP_ROUTES } from "@router/routes";

import {
  editProjectAsync,
  getProjectsAsync,
} from "../../store/features/projects";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ProjectForm from "../../components/ProjectForm/ProjectForm";

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



  const initialValues: ProjectFormTypes = {
    title: project?.title || "",
    description: project?.description || "",
    priority: project?.priority || (DEFAULT_PROJECT_PRIORITY as ProjectPriotiryProps),
  };


  const handleSubmit = (values: typeof initialValues) => {
    if (!id) return;

    const { title, description } = values;

    if (!title.trim() || !description.trim()) return;

    dispatch(editProjectAsync({ id, payload: values }));
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

      <ProjectForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel="Сохранить изменения"
      />
    </div>
  );
};

export default EditProject;
