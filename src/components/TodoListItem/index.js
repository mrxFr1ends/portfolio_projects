import React, { memo } from 'react';
import CheckBox from '../CheckBox';
import Button from '../Button';
import { CrossIcon, PinIcon } from '../../icons/Icons';
import './index.css'

const TodoListItem = ({ item, onChangeStatus, onRemove, onClick, onPin }) => {
  return (
    <div className="todos_item" onClick={onClick}>
      <CheckBox 
        check={item.isComplete} 
        setCheck={_ => onChangeStatus(item.id)}
        onClick={e => e.stopPropagation()} 
        className="todoComplete"/>
      <span className={["todoText_strike", item.isComplete ? "active" : ""].join(' ')}>
        {item.header}
      </span>
      <Button 
        className={["todo_pin_btn", item.isPin ? "active" : ""].join(' ')}
        onClick={e => {e.stopPropagation(); onPin(item.id)}}
      >
        <PinIcon className="todo_pin_icon"/>
      </Button>
      <Button 
        className="cross_button" 
        onClick={e => {e.stopPropagation(); onRemove(item.id); }}
      >
        <CrossIcon />
      </Button>
    </div>
  );
};

export default memo(TodoListItem);