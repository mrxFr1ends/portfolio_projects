import { useState } from "react";
import TextField from "../TextField";
import CheckBox from "../CheckBox";
import Button from "../Button";
import { useTodos } from "../../providers/TodoProvider";
import "./TodoForm.css";
import { deepEqual } from "../../utils";

const TodoForm = ({ item, onSubmit }) => {
  const [todo, setTodo] = useState({ ...item });
  const { changeTodo } = useTodos();

  const handleChange = event => {
    const { type, name, value, checked } = event.target;
    setTodo({ ...todo, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!deepEqual(item, todo))
      changeTodo(item.id, todo);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="todo_form">
      <TextField
        name="title"
        title="Title"
        className="todo_form__field"
        value={todo.title}
        onChange={handleChange}
      />
      <TextField
        name="detail"
        title="Details"
        className="todo_form__field"
        value={todo.detail}
        onChange={handleChange}
      />
      <div className="todo_form__row">
        <CheckBox
          className="todo_form__checkbox"
          name="done"
          id="done"
          value="Done"
          checked={todo.done}
          onChange={handleChange}
        />
        <CheckBox
          className="todo_form__checkbox"
          name="pin"
          id="pin"
          value="Pin"
          checked={todo.pin}
          onChange={handleChange}
        />
      </div>
      <Button className="todo_form__save" value="Save" type="submit" />
    </form>
  );
};

export default TodoForm;
