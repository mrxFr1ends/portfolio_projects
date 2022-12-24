import React from 'react';
import CheckBox from './../CheckBox/CheckBox';
import Button from './../Button/Button';
import { CheckMarkIcon, CrossIcon } from './../../icons/Icons';
import './TodoListItem.css'

const TodoListItem = ({ item, onComplete, onRemove }) => {
  return (
    <div className="todos_item">
      <div className="todoBtnComplete">
        <CheckBox check={item.isComplete} setCheck={_ => onComplete(item.id)} icon={<CheckMarkIcon/>}/>
      </div>
      <div className={"todoText"}>
        <span className={["todoText_strike", item.isComplete ? "active" : ""].join(' ')}>
          {item.text}
        </span>
      </div>
      <div className="todoBtnRemove">
        <Button className="cross_button" onClick={_ => onRemove(item.id)} icon={<CrossIcon />}/>
      </div>
    </div>
  );
};

export default TodoListItem;