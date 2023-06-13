import { memo } from "react";
import { useActions } from "../../../hooks/useActions";
import { CrossIcon, PinIcon } from "../../../icons/Icons";
import { ITodo } from "../../../types/todo";
import { deepEqual } from "../../../utils";
import Button from "../../generic/Button/old_index";
import CheckBox from "../../generic/CheckBox";
import "./TodoItem.css";

interface TodoItemProps {
    item: ITodo;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

// TODO: добавить в reducer или создать новый где будет открытие модального окна
// TODO: и чтобы изменялся selectedTodo, а не прокидывать onClick, onSelect и т.д.
const TodoItem: React.FC<TodoItemProps> = ({ item, onClick }) => {
    const { toggleTodo, pinTodo, removeTodo } = useActions();

    const togglePinTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        pinTodo(item.id);
    };

    const removeTodoClick = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
        removeTodo(item.id);
    };

    return (
        <div className="todo__item" onClick={onClick} key={item.id}>
            <CheckBox
                checked={item.completed}
                onChange={(_: any) => toggleTodo(item.id)}
                onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                    e.stopPropagation()
                }
                className="todo__complete"
                title={item.completed ? "Отменить выполнение" : "Выполнить"}
            />
            <span className={"todo__title " + (item.completed ? "active" : "")}>
                {item.title}
            </span>
            <Button
                className={"todo__pin " + (item.pinned ? "active" : "")}
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
