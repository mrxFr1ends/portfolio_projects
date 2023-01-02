import { useEffect, useMemo, useState } from "react";
import TodoList from "./components/TodoList";
import ModalWindow from './components/ModalWindow';
import TodoItemForm from "./components/TodoItemForm";
import useTodoState from "./hooks/useTodoState";
import { CSSTransition } from 'react-transition-group';
import Button from "./components/Button";
import { MoonIcon, SunIcon } from './icons/Icons';
import useTheme from './hooks/useTheme'
import TodoPanel from "./components/TodoPanel";

import "./App.css";

function App() {
  const { theme, setTheme } = useTheme();
  const {
    todos, 
    setTodos,
    addTodo, 
    changeTodo, 
    removeTodo, 
    toggleStatusTodo
  } = useTodoState();

  const [openTodoInfo, setOpenTodoInfo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});

  //info: ИДЕИ ПО ФУНКЦИОНАЛУ
  //todo: оптимизировать по максимуму просто
  //todo: сделать как приложение??
  //todo: сделать фильтр по просмотру всех выполненных и всех не выполненных
  //todo: мб сделать справа от + таска отдельную кнопку, которая будет открывать менюшку где будут еще 4 кнопки это отметить и удалить отмеченные и через линию фильтры.

  //info: ПРАВКИ ПО СТИЛЮ
  //todo: у меня почему то на телефоне нет зеленых иконок у выполненых todo

  const selectTodo = (item) => {
    setSelectedTodo(item); 
    setOpenTodoInfo(true);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addNewTodo = (todoValue) => {
    if (todoValue === "") return;
    const todo = {
      id: Date.now(),
      isComplete: false,
      isPin: false,
      header: todoValue,
      content: ""
    };
    addTodo(todo);
    return todo;
  }

  const completeAllTodos = () => {
    setTodos(todos.map(element => {return {...element, isComplete: true};}))
  }

  const removeCompleteTodos = () => {
    setTodos(todos.filter(element => element.isComplete === false))
  }

  const handleAddTodo = (todoValue) => {
    const todo = addNewTodo(todoValue);
    if (todo) {
      setSelectedTodo(todo);
      setOpenTodoInfo(true);
    }
  }

  const pinTodo = (id) => {
    setTodos(prevTodos => prevTodos.map(item => {
      return item.id === id ? { ...item, isPin: !item.isPin } : item;
    }));
  }

  const _changeTodo = (newTodo) => {
    changeTodo(newTodo);
    setOpenTodoInfo(false);
  }

  const sortedTodos = useMemo(() => {
    return [...todos].sort((left, right) => {
      const comp = !left.isPin - !right.isPin;
      return comp ? comp : right.id - left.id;
    });
  }, [todos]);

  return (
    <div className="container">
      <CSSTransition in={openTodoInfo} classNames='modal' timeout={150} unmountOnExit>
        <ModalWindow setVisible={setOpenTodoInfo} className="modal_window">
          <TodoItemForm 
            item={selectedTodo}
            changeTodo={_changeTodo}
          />
        </ModalWindow>
      </CSSTransition>
      <TodoPanel 
        addFastTodo={addNewTodo}
        addTodo={handleAddTodo}
        completeAllTodos={completeAllTodos}
        removeCompleteTodos={removeCompleteTodos}
      />
      <TodoList todos={sortedTodos} onChangeStatus={toggleStatusTodo} onRemove={removeTodo} onSelect={selectTodo} onPin={pinTodo}/>
      <Button className="swap_theme" onClick={_ => setTheme(prevState => prevState == 'light' ? 'dark' : 'light')}>
        {theme == 'dark' 
          ? <SunIcon className="swap_theme_icon" />
          : <MoonIcon className="swap_theme_icon" />
        }
      </Button>
    </div>
  );
}

export default App;