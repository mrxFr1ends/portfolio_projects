import { useState } from "react";
import "./App.css";
import TextField from "./components/TextField/TextField";
import TodoList from "./components/TodoList/TodoList.jsx";
import ModalWindow from './components/ModalWindow/ModalWindow';

function App() {
  const [todos, setTodos] = useState([
    { id: 0, isComplete: false, text: "Learn Rect 1" },
    { id: 1, isComplete: true, text: "Learn Rect 2" },
    { id: 2, isComplete: false, text: "ergerg" },
    { id: 3, isComplete: true, text: "eergerg4" },
    { id: 4, isComplete: false, text: "Learn Rect 5" },
    { id: 5, isComplete: true, text: "Leagergergct 6" },
    { id: 6, isComplete: false, text: "Learn Rect 7" },
    { id: 7, isComplete: true, text: "Lear124fet 8" },
    { id: 8, isComplete: false, text: "Lea124124 9" },
    { id: 9, isComplete: true, text: "Lea123110" },
  ]);
  const [todoValue, setTodoValue] = useState("");
  const [modal, setModal] = useState(true);

  const completeTodo = (id) => {
    setTodos(
      todos.map((item) => {
        if (item.id === id) return { ...item, isComplete: !item.isComplete };
        return item;
      })
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const addTodo = () => {
    if (todoValue === "") return;
    const newTodo = {
      id: Date.now(),
      isComplete: false,
      text: todoValue,
    };
    setTodos([newTodo, ...todos]);
    setTodoValue("");
  };

  //todo: Сделать доп инфу в айтеме, сделать кнопку просмотра деталей и
  //todo: edit. Добавить цвета по важности, или например сортировку по важности

  return (
    <div className="container">
      <ModalWindow visible={modal} setVisible={setModal}>
        <div>123</div>
      </ModalWindow>
      <TextField 
        name="todo" 
        value={todoValue} 
        title="Todo" 
        onChange={(e) => setTodoValue(e.target.value)} 
        onKeyUp={(e) => e.key === "Enter" && addTodo()}
      />
      <TodoList todos={todos} onComplete={completeTodo} onRemove={removeTodo} onSelect={_ => setModal(true)}/>
    </div>
  );
}

export default App;
