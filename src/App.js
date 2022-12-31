import { useEffect, useState } from "react";
import "./App.css";
import TextField from "./components/TextField";
import TodoList from "./components/TodoList";
import ModalWindow from './components/ModalWindow';
import TodoItemForm from "./components/TodoItemForm";
import useTodoState from "./hooks/useTodoState";
import { CSSTransition } from 'react-transition-group';
import Button from "./components/Button";
import { MoonIcon, SunIcon, TaskAddIcon, TaskCompleteIcon, TaskRemoveIcon } from './icons/Icons';
import useTheme from './hooks/useTheme'
import _ from "lodash";


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

  //info: ИДЕИ ПО ФУНКЦИОНАЛУ
  //todo: оптимизировать по максимуму просто
  //todo: при нажатии на Enter в Content (в форме) сделать закрытие окна
  //todo: сделать как приложение??
  //todo: библиотека lodash, как я понял это просто маленькая библиотека для работы с объектами (мб еще с чем-то) omit возвращает объект без тех ключей, которые ты передаешь. Так можно из props убирать те которые ты отдельно использовал и все остальные передавать в определенное место. А ЕСТЬ ЧЕ УЗНАЛ {placeholder, style, className, ...otherProps} не ну ты видел... как можно.
  //todo: сделать фильтр по просмотру всех выполненных и всех не выполненных
  //todo: мб сделать справа от + таска отдельную кнопку, которая будет открывать менюшку где будут еще 4 кнопки это отметить и удалить отмеченные и через линию фильтры.

  //info: ПРАВКИ ПО СТИЛЮ
  //todo: у меня почему то на телефоне нет зеленых иконок у выполненых todo
  //todo: подумать над тем, что при обновлении задний фон с белого переходит в темный (при темном стиле)

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
      isPin: false,
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

  const pinTodo = (id) => {
    setTodos(prevTodos => {
      return [...prevTodos].map(item => {
        return item.id === id ? { ...item, isPin: !item.isPin } : item;
      }).sort((left, right) => {
        const comp = !left.isPin - !right.isPin;
        return comp ? comp : right.id - left.id;
      });
    });
  }

  const _changeTodo = (newTodo) => {
    changeTodo(newTodo);
    setOpenTodoInfo(false);
  }

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
      <div className="todo_panel">
        <TextField 
          name="todo" 
          value={todoValue} 
          title="Todo" 
          onChange={e => setTodoValue(e.target.value)} 
          onKeyUp={e => e.key === "Enter" && addNewTodo()}
          className="todo_panel_field"
        />
        <Button className="todo_panel_button" onClick={_ => handleAddTodo()}>
          <TaskAddIcon className="todo_panel_icon"/>
        </Button>
        <Button className="todo_panel_button" onClick={_ => completeAllTodos()}>
          <TaskCompleteIcon className="todo_panel_icon"/>
        </Button>
        <Button className="todo_panel_button" onClick={_ => removeCompleteTodos()}>
          <TaskRemoveIcon className="todo_panel_icon"/>
        </Button>
      </div>
      <TodoList todos={todos} onChangeStatus={toggleStatusTodo} onRemove={removeTodo} onSelect={selectTodo} onPin={pinTodo}/>
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