import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./components/App/App";
import { store } from "./store/store";

const root = document.querySelector<HTMLElement>("#root");

if (!root) {
  throw new Error("root is not defined");
}

createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
