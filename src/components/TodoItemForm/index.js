import React, { useEffect, useState } from 'react';
import TextField from '../TextField'
import cl from './index.module.css'
import CheckBox from '../CheckBox';
import {CheckMarkIcon} from '../../icons/Icons';

const TodoItemForm = ({item, onChangeItem}) => {
  const [header, setHeader] = useState(item.header);
  const [content, setContent] = useState(item.content);
  const [complete, setComplete] = useState(item.isComplete);

  useEffect(() => {
    onChangeItem({
      ...item, 
      header: header, 
      content: content, 
      isComplete: complete
    });
  }, [header, content, complete])

  return (
    <div className={cl.todoForm}>
      <TextField 
        name="todo_header" 
        value={header} 
        title="Header"
        onChange={e => setHeader(e.target.value)}
      />
      <TextField 
        name="todo_content" 
        value={content} 
        title="Content"
        onChange={e => setContent(e.target.value)}
      />
      <div className={cl.todoCheck}>
        <CheckBox 
          check={complete}
          setCheck={e => setComplete(e.target.checked)}
        />
        <div className={cl.todoCheck_label}>Status</div>
      </div>
    </div>
  );
};

export default TodoItemForm;