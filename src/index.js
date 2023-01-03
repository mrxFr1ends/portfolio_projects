import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TaskProvider from "./providers/TodoProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <TaskProvider>
    <App />
  </TaskProvider>
);
