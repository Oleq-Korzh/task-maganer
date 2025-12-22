import { DEFAULT_PROJECT_PRIORITY } from "@constants/projectPriorities";
import { useNavigate } from "react-router";
import { ProjectPriotiryProps } from "@models/project.types";
import { APP_ROUTES } from "@router/routes";
import ProjectForm from "../../components/ProjectForm/ProjectForm";
import * as Yup from "yup";
import { saveProjectAsync } from "../../store/features/projects";
import { useAppDispatch } from "../../store/hooks";

import "./NewProjectPage.scss";

const NewProjectPage = () => {

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Название проекта обязательно"),
    description: Yup.string().required("Описание обязательно"),
  });

  const initialValues = {
    title: "",
    description: "",
    priority: DEFAULT_PROJECT_PRIORITY as ProjectPriotiryProps,

  };


  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: typeof initialValues) => {

    try {
      const title = values.title.trim();
      const description = values.description.trim();
      const priority = values.priority as ProjectPriotiryProps;

      await dispatch(
        saveProjectAsync({ title, description, priority })
      ).unwrap();

      navigate(APP_ROUTES.PROJECTS_URL);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoToBack = () => {
    navigate(APP_ROUTES.PROJECTS_URL);
  };

  return (

    <div className="NewProjectPage">
      <div onClick={handleGoToBack}>Вернуться назад</div>
      <h1>Add new Project</h1>
      <ProjectForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        
        submitLabel="Создать проект"
      />
    </div>
  );
};

export default NewProjectPage;
