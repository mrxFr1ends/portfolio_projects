import React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import TodoListItem from '../TodoListItem/TodoListItem.jsx';
import './TodoList.css'

const TodoList = ({todos, onComplete, onRemove, onSelect}) => {
  return (
    <ul className="todos_list">
      <TransitionGroup>
        {todos.map((item) => (
          <CSSTransition key={item.id} timeout={300} classNames="todos_item">
            <TodoListItem
              item={item}
              onComplete={onComplete}
              onRemove={onRemove}
              // onClick={onSelect}
              key={item.id}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default TodoList;