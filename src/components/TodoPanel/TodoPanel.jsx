import { useState } from "react";
import { useTodos } from "../../providers/TodoProvider";
import TextField from "../TextField";
import Button from "../Button";
import { TaskCompleteIcon, TaskRemoveIcon } from "../../icons/Icons";
import "./TodoPanel.css";

const TodoPanel = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const { todos, setTodos, addTodo } = useTodos();

  const handleAddTodo = event => {
    if (event.key === "Enter" && todoTitle !== "") {
      addTodo(todoTitle);
      setTodoTitle("");
    }
  };

  const completeAllTodos = () => {
    setTodos(
      todos.map(todo => {
        return { ...todo, done: true };
      })
    );
  };

  const removeCompleteTodos = () => {
    setTodos(todos.filter(todo => todo.isComplete === false));
  };

  return (
    <div className="todo_panel">
      <TextField
        name="todo"
        value={todoTitle}
        title="Todo"
        onChange={e => setTodoTitle(e.target.value)}
        onKeyUp={handleAddTodo}
        className="todo_panel__field"
      />
      <Button className="todo_panel__button" onClick={_ => completeAllTodos()}>
        <TaskCompleteIcon className="todo_panel__icon" />
      </Button>
      <Button
        className="todo_panel__button"
        onClick={_ => removeCompleteTodos()}
      >
        <TaskRemoveIcon className="todo_panel__icon" />
      </Button>
    </div>
  );
};

export default TodoPanel;
