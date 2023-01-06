import { useState } from "react";
import TextField from "../TextField";

const TodoPanelField = ({ addTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");

  const handleAddTodo = event => {
    if (event.key === "Enter" && todoTitle !== "") {
      addTodo(todoTitle);
      setTodoTitle("");
    }
  };

  return (
    <TextField
      name="todo"
      value={todoTitle}
      title="Todo"
      onChange={e => setTodoTitle(e.target.value)}
      onKeyUp={handleAddTodo}
      className="todo_panel__field"
    />
  );
};

export default TodoPanelField;
