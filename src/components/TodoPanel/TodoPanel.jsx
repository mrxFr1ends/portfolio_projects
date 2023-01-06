import { useTodos } from "../../providers/TodoProvider";
import Button from "../Button";
import { TaskCompleteIcon, TaskRemoveIcon } from "../../icons/Icons";
import TodoPanelField from "./TodoPanelField";
import "./TodoPanel.css";
import TodoBurgerMenu from "./TodoBurgerMenu";
import { useMemo } from "react";

const TodoPanel = () => {
  const { todos, setTodos, addTodo } = useTodos();

  const completeAllTodos = () => {
    setTodos(
      todos.map(todo => {
        return { ...todo, done: true };
      })
    );
  };

  const removeCompleteTodos = () => {
    setTodos(todos.filter(todo => todo.done === false));
  };

  const countingTodos = useMemo(() => {
    let done = 0;
    for (const todo of todos)
      done += todo.done
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
      <TodoBurgerMenu countTodos={countingTodos}/>
    </div>
  );
};

export default TodoPanel;
