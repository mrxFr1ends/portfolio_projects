import { useCallback } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useFilter, FILTERS } from "../../providers/FilterProvider";
import TodoItem from "./TodoItem/TodoItem";
import "./TodoList.css";
import { ITodo } from "../../types/todo";

interface TodoListProps {
    todos: ITodo[];
    onSelect: (todo: ITodo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onSelect }) => {
    const { filter } = useFilter();

    const filteredTodos = (() => {
        if (filter === FILTERS.Completed) return todos.filter(todo => todo.completed);
        if (filter === FILTERS.NotCompleted) return todos.filter(todo => !todo.completed);
        return todos;
    })();

    const handleClick = useCallback((todo: ITodo) => onSelect(todo), []);

    return (
        <ul className="todo_list">
            <TransitionGroup>
                {filteredTodos.map(todo => (
                    <CSSTransition
                        key={todo.id}
                        timeout={300}
                        classNames="todo__item"
                    >
                        <TodoItem
                            item={todo}
                            onClick={_ => handleClick(todo)}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
};

export default TodoList;
