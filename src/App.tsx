import { useCallback, useEffect, useState } from "react";
import TodoModal from "./components/TodoModal/TodoModal";
import TodoList from "./components/TodoList/TodoList";
import TodoPanel from "./components/TodoPanel/TodoPanel";
import SwapTheme from "./components/SwapTheme/SwapTheme";
import "./App.css";
import FilterProvider from "./providers/FilterProvider";
import { useActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { ITodo } from "./types/todo";

//info: ИДЕИ ПО ФУНКЦИОНАЛУ
//todo: оптимизировать по максимуму просто
//todo: сделать как приложение??
/////todo: сделать фильтр по просмотру всех выполненных и всех не выполненных
//todo: мб сделать справа от + таска отдельную кнопку, которая будет открывать менюшку где будут еще 4 кнопки это отметить и удалить отмеченные и через линию фильтры.
//todo: мб сделать простую базу данных и возможность создавать комнаты, хранить ключи и т.д. ну ты понял.

//info: ПРАВКИ ПО СТИЛЮ
//todo: у меня почему то на телефоне нет зеленых иконок у выполненых todo

import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import CustomThemeProvider from "./providers/CustomThemeProvider";

function App() {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
    const { todos } = useTypedSelector(state => state.todo);
    const { loadTodos } = useActions();

    useEffect(() => {
        loadTodos();
    }, []);

    const selectTodo = useCallback((item: ITodo) => {
        setSelectedTodo(item);
        setOpenModal(true);
    }, []);

    return (
        <CustomThemeProvider>
            <CssBaseline />
            <Container
                className="container"
                maxWidth="sm"
                disableGutters={true}
            >
                {selectedTodo !== null && 
                    <TodoModal
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        todo={selectedTodo}
                    />
                }
                <FilterProvider>
                    <TodoPanel />
                    <TodoList todos={todos} onSelect={selectTodo} />
                </FilterProvider>
            </Container>
            <SwapTheme />
        </CustomThemeProvider>
    );
}

export default App;
