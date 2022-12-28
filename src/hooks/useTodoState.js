import { useState } from 'react';

export default initialValue => {
  const [todos, setTodos] = useState(initialValue);

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