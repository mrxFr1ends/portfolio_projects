import { useCallback, useState } from "react";
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

  const selectTodo = useCallback(item => {
    setSelectedTodo(item);
    setOpenModal(true);
  }, []);

  const sortedTodos = () => {
    return [...todos].sort((left, right) => {
      const comp = !left.pin - !right.pin;
      return comp ? comp : right.id - left.id;
    });
  };

  return (
    <div className="container">
      <TodoModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        todo={selectedTodo}
      />
      <FilterProvider>
        <TodoPanel />
        <TodoList todos={sortedTodos()} onSelect={selectTodo} />
      </FilterProvider>
      <SwapTheme />
    </div>
  );
}

export default App;
