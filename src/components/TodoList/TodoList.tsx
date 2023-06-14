import { useCallback } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useFilter } from "../../providers/FilterProvider";
import TodoItem from "./TodoItem/TodoItem";
import "./TodoList.css";
import { ITodo } from "../../types/todo";

interface TodoListProps {
    todos: ITodo[];
    onSelect: (todo: ITodo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onSelect }) => {
    const { filterTodos } = useFilter();
    const handleClick = useCallback((todo: ITodo) => onSelect(todo), []);

    return (
        <ul className="todo_list">
            <TransitionGroup>
                {filterTodos(todos).map(todo => (
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
