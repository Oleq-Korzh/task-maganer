import express, { request, response } from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { projectsMock } from "./mockData/projects.js";
import { tasksData } from "./mockData/tasks.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/projects", (request, response) => {
  return response.json(projectsMock);
});

app.post("/projects", (request, response) => {
  const data = request.body;
  const newProject = {
    id: uuidv4(),
    ...data,
  };
  projectsMock.push(newProject);
  return response.send(newProject);
});

app.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const data = request.body;

  const index = projectsMock.findIndex((project) => project.id === id);

  projectsMock[index] = {
    ...projectsMock[index],
    ...data,
  };

  return response.json(projectsMock);
});

app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;

  const index = projectsMock.findIndex((el) => el.id === id);
  projectsMock.splice(index, 1);
  return response.json(projectsMock);
});

app.get("/tasks", (request, response) => {
  return response.json(tasksData);
});

app.post("/tasks", (request, response) => {
  const data = request.body;
  const newProject = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    ...data,
  };
  tasksData.push(newProject);
  return response.send(newProject);
});

app.put("/tasks/:id", (request, response) => {
  const { id } = request.params;
  const data = request.body;

  const index = tasksData.findIndex((project) => project.id === id);

  tasksData[index] = {
    ...tasksData[index],
    ...data,
  };

  return response.json(tasksData);
});

app.delete("/tasks/:id", (request, response) => {
  const { id } = request.params;

  const index = tasksData.findIndex((el) => el.id === id);
  tasksData.splice(index, 1);
  return response.json(tasksData);
});

app.get("/tasks/:projectId", (request, response) => {
  const { projectId } = request.params;
  const filtered = tasksData.filter((t) => t.projectId === projectId);
  return response.json(filtered);
});

let currentUser = null;

app.post("/login", (request, response) => {
  const data = request.body;

  if (data.username === "admin" && data.password === "admin") {
    currentUser = {
      id: 1,
      name: "Oleg",
      role: "admin",
    };

    return response.json({
      isAuth: true,
      user: currentUser,
    });
  }

  response.status(401).json({
    error: "Такого пользователя нет",
  });
});

app.get("/login/check", (request, response) => {
  if (currentUser) {
    return response.json({
      isAuth: true,
      user: currentUser,
    });
  }

  response.json({ isAuth: false, user: { name: "", role: "" } });
});

app.post("/logout", (request, response) => {
  currentUser = null;
  response.json({ isAuth: false, user: { name: "", role: "" } });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
