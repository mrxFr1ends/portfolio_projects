import React, { useEffect, useState } from 'react';
import TextField from '../TextField'
import cl from './index.module.css'
import CheckBox from '../CheckBox';
import Button from '../Button';

const TodoItemForm = ({item, changeTodo}) => {
  const [header, setHeader] = useState(item.header);
  const [content, setContent] = useState(item.content);
  const [complete, setComplete] = useState(item.isComplete);
  const [pin, setPin] = useState(item.isPin);

  // useEffect(() => {
  //   onChangeItem({
  //     ...item, 
  //     header: header, 
  //     content: content, 
  //     isComplete: complete
  //   });
  // }, [header, content, complete])

  const saveTodo = () => {
    changeTodo({
      ...item, 
      header: header, 
      content: content, 
      isComplete: complete,
      isPin: pin
    });
  };

  return (
    <form onSubmit={e => {e.preventDefault(); saveTodo()}} className={cl.todoForm}>
      <TextField 
        name="todo_header" 
        value={header} 
        title="Header"
        onChange={e => setHeader(e.target.value)}
        className={cl.todo_info_field}
      />
      <TextField 
        name="todo_content" 
        value={content} 
        title="Content"
        onChange={e => setContent(e.target.value)}
        className={cl.todo_info_field}
        onKeyUp={e => e.key === "Enter" && saveTodo()}
      />
      <div className={cl.todoCheckboxes}>
        <div className={cl.todoCheckbox}>
          <CheckBox 
            className={cl.todo_info_checkbox}
            check={complete}
            setCheck={e => setComplete(e.target.checked)}
          />
          <div className={cl.todoCheck_label}>Complete</div>
        </div>
        <div className={cl.todoCheckbox}>
          <CheckBox 
            className={cl.todo_info_checkbox}
            check={pin}
            setCheck={e => setPin(e.target.checked)}
          />
          <div className={cl.todoCheck_label}>Pin</div>
        </div>
      </div>
      <Button 
        className={cl.todo_info_save}
        onClick={_ => saveTodo()}
      >
        Save
      </Button>
    </form>
  );
};

export default TodoItemForm;