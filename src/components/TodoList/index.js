import React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import TodoListItem from '../TodoListItem';
import './index.css'

const TodoList = ({todos, onChangeStatus, onRemove, onSelect, onPin}) => {
  return (
    <ul className="todos_list">
      <TransitionGroup>
        {todos.map((item) => (
          <CSSTransition key={item.id} timeout={300} classNames="todos_item">
            <TodoListItem
              item={item}
              onComplete={onChangeStatus}
              onRemove={onRemove}
              onClick={_ => onSelect(item)}
              key={item.id}
              onPin={onPin}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default TodoList;