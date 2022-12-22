import { useState } from "react";
import "./App.css";

const TodoListItem = ({item, onComplete, onRemove}) => {
  return (
    <div>
      <button 
        className="todoBtnComplete"
        onClick={() => onComplete(item.id)}>
          Active
      </button>
      <div className={"todoText" + (item.isComplete ? ' todoComplete' : '')}>{item.text}</div>
      <button 
        className="todoBtnRemove"
        onClick={() => onRemove(item.id)}>
          X
      </button>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {id: 0, isComplete: false, text: "Learn Rect 1"},
    {id: 1, isComplete: true, text: "Learn Rect 2"},
  ]);
  const [todoValue, setTodoValue] = useState('');

  const onComplete = (id) => {
    setTodos(todos.map(item => {
      if (item.id === id)
        return {...item, isComplete: !item.isComplete}
      return item
    }))
  }

  const onRemove = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  }

  const addTodo = () => {
    if (todoValue === '' )
      return
    const newTodo = {
      id: Date.now(),
      isComplete: false,
      text: todoValue
    };
    setTodos([...todos, newTodo]);
    setTodoValue('');
  }

  return (
    <div className="container">
      <div className="text-field">
        <input
          className="text-field__input"
          type="text"
          id="todo"
          name="todo"
          placeholder=" "
          value={todoValue}
          onChange={e => setTodoValue(e.target.value)}
          onKeyUp={e => e.key === 'Enter' && addTodo()}
        />
        <label className="text-field__label" htmlFor="todo">
          Todo
        </label>
      </div>
      <ul className="todos_list">
        {todos.map(item =>
          <TodoListItem 
            item={item}
            onComplete={onComplete}
            onRemove={onRemove}
            key={item.id}
          />
        )}
      </ul>
    </div>
  );
}

export default App;
