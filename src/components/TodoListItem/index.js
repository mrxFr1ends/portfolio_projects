import React, { memo } from 'react';
import CheckBox from '../CheckBox';
import Button from '../Button';
import { CheckMarkIcon, CrossIcon } from '../../icons/Icons';
import './index.css'

const TodoListItem = ({ item, onChangeStatus, onRemove, onClick }) => {
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
        className="cross_button" 
        onClick={e => {e.stopPropagation(); onRemove(item.id); }} 
        icon={<CrossIcon />}
      />
    </div>
  );
};

export default memo(TodoListItem);