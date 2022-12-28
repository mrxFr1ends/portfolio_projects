import { useState } from "react";
import "./App.css";
import TextField from "./components/TextField";
import TodoList from "./components/TodoList";
import ModalWindow from './components/ModalWindow';
import TodoItemForm from "./components/TodoItemForm";
import useTodoState from "./hooks/useTodoState";
import { CSSTransition } from 'react-transition-group';
import Button from "./components/Button";
import {CrossIcon, SearchIcon, TaskAddIcon, TaskCompleteIcon, TaskRemoveIcon, TrashcanIcon} from './icons/Icons';

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = 
      [array[randomIndex], array[currentIndex]];
  }
  return array;
}
const generateTodos = () => {
  let headers = shuffle(['Погулять с собакой', 'Погулять с кошкой', 'Приготовить ужин', 'Приготовить обед', 'Помыться', 'Сходить в музей', 'Сходить на рынок']);
  let contents = ['Не придумал идите на: '];
  let todos = [];
  for (let i = 0; i < headers.length; ++i)
    todos.push({
      id: i,
      isComplete: Math.round(Math.random() * 10) % 2 == 0,
      header: headers[i],
      content: contents[0] + Math.round(Math.random() * 100)
    });
  return todos;
};
const defaultTodos = generateTodos();

function App() {
  const {
    todos, 
    setTodos,
    addTodo, 
    changeTodo, 
    removeTodo, 
    toggleStatusTodo
  } = useTodoState(defaultTodos);

  const [todoValue, setTodoValue] = useState("");
  const [openTodoInfo, setOpenTodoInfo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});

  //todo: добавить панель с кнопками удаления выполненных, выполнить все сразу
  //todo: Добавить цвета по важности, или например сортировку по важности.

  const selectTodo = (item) => {
    setSelectedTodo(item); 
    setOpenTodoInfo(true);
  }

  const addNewTodo = () => {
    if (todoValue === "") return;
    addTodo({
      id: Date.now(),
      isComplete: false,
      header: todoValue,
    });
    setTodoValue("");
  }

  const completeAllTodos = () => {
    setTodos(todos.map(element => {return {...element, isComplete: true};}))
  }

  const removeCompleteTodos = () => {
    setTodos(todos.filter(element => element.isComplete === false))
  }

  return (
    <div className="container">
      <CSSTransition in={openTodoInfo} classNames='modal' timeout={150} unmountOnExit>
        <ModalWindow setVisible={setOpenTodoInfo}>
          <TodoItemForm 
            item={selectedTodo}
            onChangeItem={changeTodo}
          />
        </ModalWindow>
      </CSSTransition>
      <div className="todo_panel">
        <TextField 
          name="todo" 
          value={todoValue} 
          title="Todo" 
          onChange={e => setTodoValue(e.target.value)} 
          onKeyUp={e => e.key === "Enter" && addNewTodo()}
        />
        <Button 
          className="todo_panel_button"
          onClick={_ => addNewTodo()} 
          icon={<TaskAddIcon className="todo_panel_icon"/>}
        />
        <Button 
          className="todo_panel_button"
          onClick={_ => completeAllTodos()}
          icon={<TaskCompleteIcon className="todo_panel_icon"/>}
        />
        <Button 
          className="todo_panel_button"
          onClick={_ => removeCompleteTodos()} 
          icon={<TaskRemoveIcon className="todo_panel_icon"/>}
        />
      </div>
      <TodoList todos={todos} onChangeStatus={toggleStatusTodo} onRemove={removeTodo} onSelect={selectTodo}/>
    </div>
  );
}

export default App;