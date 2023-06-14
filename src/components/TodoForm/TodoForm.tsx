import { useState } from "react";
import { useActions } from "../../hooks/useActions";
import { ITodo } from "../../types/todo";
import { deepEqual } from "../../utils";
import Button from "../generic/Button";
import CheckBox from "../generic/CheckBox";
import TextField from "../generic/TextField";
import "./TodoForm.css";

interface TodoFormProps {
    item: ITodo;
    onSubmit: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ item, onSubmit }) => {
    const [todo, setTodo] = useState<ITodo>({ ...item });
    const { changeTodo } = useActions();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { type, name, value, checked } = event.target;
        setTodo({ ...todo, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!deepEqual(item, todo)) changeTodo(todo);
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="todo_form">
            <TextField
                name="title"
                title="Заголовок"
                className="todo_form__field"
                value={todo.title}
                onChange={handleChange}
            />
            <TextField
                name="detail"
                title="Детали"
                className="todo_form__field"
                value={todo.detail}
                onChange={handleChange}
            />
            <div className="todo_form__row">
                <CheckBox
                    className="todo_form__checkbox"
                    name="completed"
                    id="completed"
                    value="Выполнено"
                    checked={todo.completed}
                    onChange={handleChange}
                />
                <CheckBox
                    className="todo_form__checkbox"
                    name="pinned"
                    id="pinned"
                    value="Закреплено"
                    checked={todo.pinned}
                    onChange={handleChange}
                />
            </div>
            <Button className="todo_form__save" value="Сохранить изменения" type="submit" />
        </form>
    );
};

export default TodoForm;
