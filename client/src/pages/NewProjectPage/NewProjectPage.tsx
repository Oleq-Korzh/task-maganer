import { useRef } from "react";
import { useNavigate } from "react-router";
import { TASKS_PRIORITIES } from "@constants/taskPriorities";
import { ProjectPriotiryProps } from "@models/project.types";
import { APP_ROUTES } from "@router/routes";

import { saveProjectAsync } from "../../store/features/projects";
import { useAppDispatch } from "../../store/hooks";

import "./NewProjectPage.scss";

const NewProjectPage = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priorityRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSave = async () => {
    if (
      !titleRef.current?.value ||
      !descriptionRef.current?.value ||
      !priorityRef.current?.value
    ) {
      return;
    }

    try {
      const title = titleRef.current.value.trim();
      const description = descriptionRef.current.value.trim();
      const priority = priorityRef.current.value as ProjectPriotiryProps;

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
      <form>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            ref={titleRef}
          />
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Enter description"
            ref={descriptionRef}
          ></textarea>
        </div>
        <div>
          <select name="priority" ref={priorityRef}>
            {Object.entries(TASKS_PRIORITIES).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProjectPage;
