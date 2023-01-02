import React, { memo } from 'react';
import CheckBox from '../CheckBox';
import Button from '../Button';
import { CrossIcon, PinIcon } from '../../icons/Icons';
import './index.css';

const TodoListItem = ({ item, key, onClick, onComplete, onPin, onRemove }) => {
  const handleInputClick = (event, func) => {
    event.stopPropagation();
    if (func !== undefined)
      func();
  };

  return (
    <div className="todo__item" onClick={onClick} key={key}>
      <CheckBox 
        check={item.isComplete} 
        onChange={_ => onComplete(item.id)}
        onClick={handleInputClick}
        className="todo__complete"
      />
      <span className={"todo__title " + (item.isComplete ? "active" : "")}>
        {item.header}
      </span>
      <Button 
        className={"todo__pin " + (item.isPin ? "active" : "")}
        onClick={e => handleInputClick(e, onPin(item.id))}
        value={<PinIcon/>}
      />
      <Button 
        className="todo__remove" 
        onClick={e => handleInputClick(e, onRemove(item.id))}
        value={<CrossIcon/>}
      />
    </div>
  );
};

export default memo(TodoListItem);