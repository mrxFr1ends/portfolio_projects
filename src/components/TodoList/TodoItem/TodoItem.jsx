import CheckBox from "../../CheckBox";
import Button from "../../Button";
import { CrossIcon, PinIcon } from "../../../icons/Icons";
import { useTodos } from "../../../providers/TodoProvider";
import "./TodoItem.css";

const TodoItem = ({ item, key, onClick }) => {
  const { removeTodo, changeTodo } = useTodos();

  const toggleDoneTodo = () => {
    changeTodo(item.id, { done: !item.done });
  };

  const togglePinTodo = event => {
    event.stopPropagation();
    changeTodo(item.id, { pin: !item.pin });
  };

  const removeTodoClick = event => {
    event.stopPropagation();
    removeTodo(item.id);
  };

  return (
    <div className="todo__item" onClick={onClick} key={key}>
      <CheckBox
        check={item.done}
        onChange={_ => toggleDoneTodo()}
        onClick={e => e.stopPropagation()}
        className="todo__complete"
      />
      <span className={"todo__title " + (item.done ? "active" : "")}>
        {item.title}
      </span>
      <Button
        className={"todo__pin " + (item.pin ? "active" : "")}
        onClick={togglePinTodo}
        value={<PinIcon />}
      />
      <Button
        className="todo__remove"
        onClick={removeTodoClick}
        value={<CrossIcon />}
      />
    </div>
  );
};

export default TodoItem;
