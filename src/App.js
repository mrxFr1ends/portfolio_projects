import { useCallback, useMemo, useState } from "react";
import TodoModal from "./components/TodoModal/TodoModal";
import TodoList from "./components/TodoList/TodoList";
import TodoPanel from "./components/TodoPanel/TodoPanel";
import SwapTheme from "./components/SwapTheme/SwapTheme";
import { useTodos } from "./providers/TodoProvider";
import "./App.css";
import FilterProvider from "./providers/FilterProvider";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});
  const { todos } = useTodos();

  //info: ИДЕИ ПО ФУНКЦИОНАЛУ
  //todo: оптимизировать по максимуму просто
  //todo: сделать как приложение??
  /////todo: сделать фильтр по просмотру всех выполненных и всех не выполненных
  //todo: мб сделать справа от + таска отдельную кнопку, которая будет открывать менюшку где будут еще 4 кнопки это отметить и удалить отмеченные и через линию фильтры.
  //todo: мб сделать простую базу данных и возможность создавать комнаты, хранить ключи и т.д. ну ты понял.

  //info: ПРАВКИ ПО СТИЛЮ
  //todo: у меня почему то на телефоне нет зеленых иконок у выполненых todo

  const selectTodo = useCallback(item => {
    setSelectedTodo(item);
    setOpenModal(true);
  }, []);

  const sortedTodos = useMemo(() => {
    return [...todos].sort((left, right) => {
      const comp = !left.pin - !right.pin;
      return comp ? comp : right.id - left.id;
    });
  }, [todos]);

  return (
    <div className="container">
      <TodoModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        todo={selectedTodo}
      />
      <FilterProvider>
        <TodoPanel />
        <TodoList todos={sortedTodos} onSelect={selectTodo} />
      </FilterProvider>
      <SwapTheme />
    </div>
  );
}

export default App;
