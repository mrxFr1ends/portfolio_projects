import { TransitionGroup, CSSTransition } from "react-transition-group";
import TodoItem from "./TodoItem/TodoItem";
import "./TodoList.css";

const TodoList = ({ todos, onSelect }) => {
  return (
    <ul className="todo_list">
      <TransitionGroup>
        {todos.map(todo => (
          <CSSTransition key={todo.id} timeout={300} classNames="todo_item">
            <TodoItem item={todo} onClick={_ => onSelect(todo)} key={todo.id} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default TodoList;
