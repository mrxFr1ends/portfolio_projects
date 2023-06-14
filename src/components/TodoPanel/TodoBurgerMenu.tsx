import React, { useState } from "react";
import {
    BurgerIcon,
    ShowAllIcon,
    ShowCompleteIcon,
    ShowIncompleteIcon,
} from "../../icons/Icons";
import { useFilter } from "../../providers/FilterProvider";
import { FilterTypes } from "../../types/filter";
import Button from "../generic/Button";

const MenuItems = [
    {
        title: "Показать всё",
        icon: ShowAllIcon,
        filter: FilterTypes.ALL,
    },
    {
        title: "Показать выполненные",
        icon: ShowCompleteIcon,
        filter: FilterTypes.COMPLETED,
    },
    {
        title: "Показать невыполненные",
        icon: ShowIncompleteIcon,
        filter: FilterTypes.NOT_COMPLETED,
    },
];

interface TodoBurgerMenuProps {
    countTodos: number[];
}

const TodoBurgerMenu: React.FC<TodoBurgerMenuProps> = ({ countTodos }) => {
    const [open, setOpen] = useState(false);
    const { filter, setFilter } = useFilter();

    const handleClick = (newFilter: FilterTypes) => {
        setOpen(false);
        setFilter(newFilter);
    };

    const handleUnfocus = (event: React.FocusEvent<HTMLButtonElement>) => {
        if (event.relatedTarget?.classList.contains("todo_panel__menu_btn")) {
            event.preventDefault();
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <Button
                className="todo_panel__button todo_panel__burger_btn"
                onClick={(_: any) => setOpen(prev => !prev)}
                title="Фильтры"
                id="burger_button"
                onBlur={handleUnfocus}
            >
                <BurgerIcon
                    className={`todo_panel__icon todo_panel__burger ${
                        open ? "active" : ""
                    }`}
                />
            </Button>
            <div className={`todo_panel__menu ${open ? "active" : ""}`}>
                {MenuItems.map((item, index) => (
                    <Button
                        key={index}
                        className={`todo_panel__menu_btn ${
                            filter === item.filter ? "active" : ""
                        }`}
                        title={item.title}
                        onClick={(_: any) => handleClick(item.filter)}
                    >
                        <item.icon className="todo_panel__menu_icon" />
                        <div className="todo_panel__menu_count">
                            {countTodos[index]}
                        </div>
                    </Button>
                ))}
            </div>
        </>
    );
};

export default TodoBurgerMenu;
