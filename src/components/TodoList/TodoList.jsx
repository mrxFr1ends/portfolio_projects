import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useFilter, FILTERS } from "../../providers/FilterProvider";
import TodoItem from "./TodoItem/TodoItem";
import "./TodoList.css";

const TodoList = ({ todos, onSelect }) => {
  const { filter } = useFilter();

  const filteredTodos = (() => {
    if (filter === FILTERS.Done) return todos.filter(todo => todo.done);
    if (filter === FILTERS.NotDone) return todos.filter(todo => !todo.done);
    return todos;
  })();

  return (
    <ul className="todo_list">
      <TransitionGroup>
        {filteredTodos.map(todo => (
          <CSSTransition key={todo.id} timeout={300} classNames="todo__item">
            <TodoItem item={todo} onClick={_ => onSelect(todo)} key={todo.id} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default TodoList;
