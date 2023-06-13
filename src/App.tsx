import { useCallback, useEffect, useMemo, useState } from "react";
import TodoModal from "./components/TodoModal/TodoModal";
import TodoList from "./components/TodoList/TodoList";
import TodoPanel from "./components/TodoPanel/TodoPanel";
import SwapTheme from "./components/SwapTheme/SwapTheme";
import "./App.css";
import FilterProvider from "./providers/FilterProvider";
import { useActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { ITodo } from "./types/todo";

function App() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
  const { todos } = useTypedSelector(state => state.todo);
  const { loadTodos } = useActions();

  useEffect(() => {
    loadTodos();
  }, []);

  //info: ИДЕИ ПО ФУНКЦИОНАЛУ
  //todo: оптимизировать по максимуму просто
  //todo: сделать как приложение??
  /////todo: сделать фильтр по просмотру всех выполненных и всех не выполненных
  //todo: мб сделать справа от + таска отдельную кнопку, которая будет открывать менюшку где будут еще 4 кнопки это отметить и удалить отмеченные и через линию фильтры.
  //todo: мб сделать простую базу данных и возможность создавать комнаты, хранить ключи и т.д. ну ты понял.

  //info: ПРАВКИ ПО СТИЛЮ
  //todo: у меня почему то на телефоне нет зеленых иконок у выполненых todo

  const selectTodo = useCallback((item: ITodo) => {
    setSelectedTodo(item);
    setOpenModal(true);
  }, []);

  const sortedTodos = useMemo(() => {
    return [...todos].sort((left, right) => {
      const comp = Number(!left.pinned) - Number(!right.pinned);
      return comp ? comp : right.createdTimestamp - left.createdTimestamp;
    });
  }, [todos]);

  return (
    <div className="container">
      <TodoModal
        openModal={selectedTodo !== null && openModal}
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
