import CheckBox from "../../CheckBox";
import Button from "../../Button";
import { CrossIcon, PinIcon } from "../../../icons/Icons";
import "./TodoItem.css";
import { memo } from "react";
import { deepEqual } from "../../../utils";

const TodoItem = ({ item, key, onClick, removeTodo, changeTodo }) => {
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
        checked={item.done}
        onChange={_ => toggleDoneTodo()}
        onClick={e => e.stopPropagation()}
        className="todo__complete"
        title={item.done ? "Отменить выполнение" : "Выполнить"}
      />
      <span className={"todo__title " + (item.done ? "active" : "")}>
        {item.title}
      </span>
      <Button
        className={"todo__pin " + (item.pin ? "active" : "")}
        onClick={togglePinTodo}
        value={<PinIcon />}
        title="Прикрепить"
      />
      <Button
        className="todo__remove"
        onClick={removeTodoClick}
        value={<CrossIcon />}
        title="Удалить"
      />
    </div>
  );
};

export default memo(TodoItem, (prev, next) => deepEqual(prev.item, next.item));
