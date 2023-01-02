import React, { useState } from 'react';
import TextField from '../TextField';
import Button from '../Button';
import {TaskAddIcon, TaskCompleteIcon, TaskRemoveIcon} from '../../icons/Icons';

import './index.css'

const TodoPanel = ({addFastTodo, addTodo, completeAllTodos, removeCompleteTodos}) => {
  const [todoValue, setTodoValue] = useState("");

  const handleAddTodo = (addTodoVariant) => {
    addTodoVariant(todoValue);
    setTodoValue("");
  };  

  return (
    <div className="todo_panel">
      <TextField 
        name="todo" 
        value={todoValue} 
        title="Todo" 
        onChange={e => setTodoValue(e.target.value)} 
        onKeyUp={e => e.key === "Enter" && handleAddTodo(addFastTodo)}
        className="todo_panel_field"
      />
      <Button className="todo_panel_button" onClick={_ => handleAddTodo(addTodo)}>
        <TaskAddIcon className="todo_panel_icon"/>
      </Button>
      <Button className="todo_panel_button" onClick={_ => completeAllTodos()}>
        <TaskCompleteIcon className="todo_panel_icon"/>
      </Button>
      <Button className="todo_panel_button" onClick={_ => removeCompleteTodos()}>
        <TaskRemoveIcon className="todo_panel_icon"/>
      </Button>
    </div>
  );
};

export default TodoPanel;