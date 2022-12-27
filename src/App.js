import { useRef, useState } from "react";
import "./App.css";
import TextField from "./components/TextField";
import TodoList from "./components/TodoList";
import ModalWindow from './components/ModalWindow';
import TodoItemForm from "./components/TodoItemForm";
import useTodoState from "./hooks/useTodoState";
import {CSSTransition} from 'react-transition-group';

const generateTodos = () => {
  let todos = [];
  for (let i = 0; i < 10; ++i) {
    todos.push({
      id: i,
      isComplete: Math.round(Math.random() * 10) % 2 == 0,
      header: i + ": " + Math.random().toString(36).slice(2, 7),
      content: i + ": " + Math.random().toString(36).slice(2)
    })
  }
  return todos;
};
const defaultTodos = generateTodos();

function App() {
  const {
    todos, 
    addTodo, 
    changeTodo, 
    removeTodo, 
    toggleStatusTodo
  } = useTodoState(defaultTodos);

  const [todoValue, setTodoValue] = useState("");
  const [openTodoInfo, setOpenTodoInfo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});

  //todo: Добавить цвета по важности, или например сортировку по важности.

  const selectTodo = (item) => {
    setSelectedTodo(item); 
    setOpenTodoInfo(true);
  }

  const handlePressEnter = () => {
    if (todoValue === "") return;
    addTodo({
      id: Date.now(),
      isComplete: false,
      header: todoValue,
    });
    setTodoValue("");
  }

  return (
    <div className="container">
      <CSSTransition in={openTodoInfo}classNames='modal' timeout={150} unmountOnExit>
        <ModalWindow setVisible={setOpenTodoInfo}>
          <TodoItemForm 
            item={selectedTodo}
            onChangeItem={changeTodo}
          />
        </ModalWindow>
      </CSSTransition>
      <TextField 
        name="todo" 
        value={todoValue} 
        title="Todo" 
        onChange={(e) => setTodoValue(e.target.value)} 
        onKeyUp={(e) => e.key === "Enter" && handlePressEnter()}
      />
      <TodoList todos={todos} onChangeStatus={toggleStatusTodo} onRemove={removeTodo} onSelect={selectTodo}/>
    </div>
  );
}

// if (todoValue === "") return;
//     const newTodo = {
//       id: Date.now(),
//       isComplete: false,
//       text: todoValue,
//     };
//     setTodos([newTodo, ...todos]);
//     setTodoValue("");

export default App;