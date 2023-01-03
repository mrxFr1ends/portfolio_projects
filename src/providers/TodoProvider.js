import { createContext, useState, useContext, useEffect } from "react";

const TodoContext = createContext();
export const useTodos = () => useContext(TodoContext);

const defaultTodo = {
  title: "",
  detail: "",
  done: false,
  pin: false,
};

const getSavedTodos = () => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
};

export default function TodoProvider({ children }) {
  const [todos, setTodos] = useState(getSavedTodos());

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = title => {
    setTodos([
      {
        ...defaultTodo,
        id: Date.now(),
        title: title,
      },
      ...todos,
    ]);
  };

  const removeTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const changeTodo = (id, changes) => {
    setTodos(
      todos.map(todo => {
        return todo.id === id ? { ...todo, ...changes } : todo;
      })
    );
  };

  const providerValue = {
    todos,
    setTodos,
    addTodo,
    removeTodo,
    changeTodo,
  };

  return (
    <TodoContext.Provider value={providerValue}>
      {children}
    </TodoContext.Provider>
  );
}
