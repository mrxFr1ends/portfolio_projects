import React, { useState }  from 'react';
import TextField from '../TextField'
import cl from './index.module.css'
import CheckBox from '../CheckBox';
import Button from '../Button';

const TodoItemForm = ({item, changeTodo}) => {
  const [todo, setTodo] = useState({...item});

  const handleChange = (value, key) => {
    setTodo({...todo, [key]: value});
  };

  const saveTodo = (e) => {
    e.preventDefault();
    changeTodo({...todo});
  };

  return (
    <form onSubmit={saveTodo} className={cl.todoForm}>
      <TextField 
        name="header" 
        title="Header"
        className={cl.todo_info_field}
        value={todo.header}
        onChange={e => handleChange(e.target.value, "header")}
      />
      <TextField 
        name="content" 
        title="Content"
        className={cl.todo_info_field}
        value={todo.content}
        onChange={e => handleChange(e.target.value, "content")}
      />
      <div className={cl.todoCheckboxes}>
        <CheckBox 
          className={cl.todo_info_checkbox}
          name="isComplete"
          id="complete"
          value="Complete"
          check={todo.isComplete}
          onChange={e => handleChange(e.target.checked, "isComplete")}
        />
        <CheckBox 
          className={cl.todo_info_checkbox}
          name="isPin"
          id="pin"
          value="Pin"
          check={todo.isPin}
          onChange={e => handleChange(e.target.checked, "isPin")}
        />
      </div>
      <Button 
        className={cl.todo_info_save}
        value="Save"
        type="submit"
      />
    </form>
  );
};

export default TodoItemForm;