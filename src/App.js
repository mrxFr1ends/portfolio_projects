import { useEffect, useState } from "react";
import "./App.css";
import TextField from "./components/TextField";
import TodoList from "./components/TodoList";
import ModalWindow from './components/ModalWindow';
import TodoItemForm from "./components/TodoItemForm";
import useTodoState from "./hooks/useTodoState";
import { CSSTransition } from 'react-transition-group';
import Button from "./components/Button";
import {CrossIcon, MoonIcon, SearchIcon, SunIcon, TaskAddIcon, TaskCompleteIcon, TaskRemoveIcon, TrashcanIcon} from './icons/Icons';
import useTheme from './hooks/useTheme'

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
  const getSavedTodos = () => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  };
  const { theme, setTheme } = useTheme();
  const {
    todos, 
    setTodos,
    addTodo, 
    changeTodo, 
    removeTodo, 
    toggleStatusTodo
  } = useTodoState(getSavedTodos());

  const [todoValue, setTodoValue] = useState("");
  const [openTodoInfo, setOpenTodoInfo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});

  //todo: сделать возможность закреплять todo (добавить инонку кнопки к этому todo в списке) и они будут в самом верху
  //todo: сделать где-нибудь в locale storage
  //todo: оптимизировать по максимуму просто
  //todo: у меня почему то на телефоне нет зеленых иконок у выполненых todo
  //todo: переключение темной на светлую тему в правый нижний угол

  const selectTodo = (item) => {
    setSelectedTodo(item); 
    setOpenTodoInfo(true);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addNewTodo = () => {
    if (todoValue === "") return;
    const todo = {
      id: Date.now(),
      isComplete: false,
      header: todoValue,
    };
    addTodo(todo);
    setTodoValue("");
    return todo;
  }

  const completeAllTodos = () => {
    setTodos(todos.map(element => {return {...element, isComplete: true};}))
  }

  const removeCompleteTodos = () => {
    setTodos(todos.filter(element => element.isComplete === false))
  }

  const handleAddTodo = () => {
    const todo = addNewTodo();
    if (todo) {
      setSelectedTodo(todo);
      setOpenTodoInfo(true);
    }
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
          className="todo_panel_field"
        />
        <Button 
          className="todo_panel_button"
          onClick={_ => handleAddTodo()} 
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
      <div className="swap_theme" onClick={_ => setTheme(prevState => prevState == 'light' ? 'dark' : 'light')}>
        {theme == 'dark' 
          ? <SunIcon className="swap_theme_icon" />
          : <MoonIcon className="swap_theme_icon" />
        }
      </div>
    </div>
  );
}

export default App;