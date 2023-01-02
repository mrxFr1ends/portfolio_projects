import { useState } from 'react';

const getSavedTodos = () => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const useTodoState = () => {
  const [todos, setTodos] = useState(getSavedTodos());

  return {
    todos,
    setTodos: setTodos,
    addTodo: newTodo => setTodos(
      [newTodo, ...todos]
    ),
    removeTodo: id => setTodos(
      prevTodos => prevTodos.filter(item => item.id !== id)
    ),
    changeTodo: newTodo => setTodos(prevTodos => 
      prevTodos.map(item => item.id === newTodo.id 
        ? newTodo 
        : item)
    ),
    toggleStatusTodo: id => setTodos(prevTodos =>
      prevTodos.map(item => item.id === id 
        ? { ...item, isComplete: !item.isComplete } 
        : item)
    )
  }
};

export default useTodoState;