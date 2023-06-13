import { useMemo } from "react";
import { TaskCompleteIcon, TaskRemoveIcon } from "../../icons/Icons";
import Button from "../generic/Button/old_index";
import TodoBurgerMenu from "./TodoBurgerMenu";
import "./TodoPanel.css";
import TodoPanelField from "./TodoPanelField";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { ITodo } from "../../types/todo";

const TodoPanel = () => {
    const { todos } = useTypedSelector(state => state.todo);
    const { setTodos, addTodo } = useActions();

    const completeAllTodos = () => {
        setTodos(
            todos.map((todo: ITodo): ITodo => {
                return { ...todo, completed: true };
            })
        );
    };

    const removeCompleteTodos = () => {
        setTodos(todos.filter(todo => todo.completed === false));
    };

    const countingTodos = useMemo(() => {
        let done = 0;
        for (const todo of todos) done += Number(todo.completed);
        return [todos.length, done, todos.length - done];
    }, [todos]);

    return (
        <div className="todo_panel">
            <TodoPanelField addTodo={addTodo} />
            <Button
                className="todo_panel__button"
                onClick={completeAllTodos}
                value={<TaskCompleteIcon className="todo_panel__icon" />}
                title="Выполнить всё"
            />
            <Button
                className="todo_panel__button"
                onClick={removeCompleteTodos}
                value={<TaskRemoveIcon className="todo_panel__icon" />}
                title="Удалить выполненные"
            />
            <TodoBurgerMenu countTodos={countingTodos} />
        </div>
    );
};

export default TodoPanel;
