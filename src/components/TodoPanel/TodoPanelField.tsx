import { useState } from "react";
import TextField from "../generic/TextField";
import { addTodo } from "../../store/action-creators/todo";

interface TodoPanelFieldProps {
  addTodo: typeof addTodo;
}

const TodoPanelField: React.FC<TodoPanelFieldProps> = ({ addTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");

  const handleAddTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && todoTitle !== "") {
      addTodo({title: todoTitle});
      setTodoTitle("");
    }
  };

  return (
    <TextField
      name="todo"
      value={todoTitle}
      title="Todo"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodoTitle(e.target.value)}
      onKeyUp={handleAddTodo}
      className="todo_panel__field"
    />
  );
};

export default TodoPanelField;
