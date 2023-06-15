import { useMemo } from "react";
import "./TodoPanel.css";
import BurgerMenu, { IMenuItem } from "../generic/BurgerMenu";
import TodoPanelField from "./TodoPanelField";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { ITodo } from "../../types/todo";
import { Button, Stack, Theme } from "@mui/material";
import { EventAvailable, EventBusy } from '@mui/icons-material';
import { ShowAllIcon, ShowCompleteIcon, ShowIncompleteIcon } from "../../icons/Icons";
import { FilterTypes } from "../../types/filter";
import { useFilter } from "../../providers/FilterProvider";

const TodoPanel = () => {
    const { todos } = useTypedSelector(state => state.todo);
    const { setTodos } = useActions();
    const { filter, setFilter } = useFilter();

    const MenuItems: IMenuItem[] = useMemo(() => {
        let done = 0;
        for (const todo of todos) done += Number(todo.completed);
        return [
            {
                id: 0,
                title: `Показать все`,
                icon: ShowAllIcon,
                count: todos.length,
                color: "primary",
                filter: FilterTypes.ALL,
            },
            {
                id: 1,
                title: `Показать выполненные`,
                icon: ShowCompleteIcon,
                count: done,
                color: "success",
                filter: FilterTypes.COMPLETED,
            },
            {
                id: 2,
                title: `Показать невыполненные`,
                icon: ShowIncompleteIcon,
                count: todos.length - done,
                color: "error",
                filter: FilterTypes.NOT_COMPLETED,
            },
        ]
    }, [todos]);

    const getSelectedItem = (): IMenuItem => {
        return MenuItems[MenuItems.findIndex(item => item.filter === filter)];
    }

    const completeAllTodos = () => {
        setTodos(
            todos.map((todo: ITodo): ITodo => {
                return { ...todo, completed: true };
            })
        );
    };

    const removeCompleteTodos = () => {
        setTodos(todos.filter(todo => todo.completed === false));
    };

    const selectFilter = (item: IMenuItem): void => {
        setFilter(item.filter);
    }

    return (
        <Stack direction="row" className="todo_panel">
            <TodoPanelField />
            <Button
                className="todo_panel__button"
                onClick={completeAllTodos}
                title="Выполнить всё"
            >
                <EventAvailable className="todo_panel__icon" />
            </Button>
            <Button
                className="todo_panel__button"
                onClick={removeCompleteTodos}
                title="Удалить выполненные"
            >
                <EventBusy className="todo_panel__icon" />
            </Button>
            <BurgerMenu
                items={MenuItems}
                selectItem={getSelectedItem()}
                onSelectItem={selectFilter}
                className="todo_panel__button"
                iconsClassName="todo_panel__icon"
                popperClassName="todo_panel__popper"
            />
        </Stack>
    );
};

export default TodoPanel;
