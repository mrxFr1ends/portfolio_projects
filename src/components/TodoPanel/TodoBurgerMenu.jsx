import React from "react";
import Button from "../Button";
import {
  BurgerIcon,
  ShowAllIcon,
  ShowCompleteIcon,
  ShowIncompleteIcon,
} from "../../icons/Icons";
import { useState } from "react";
import { useFilter, FILTERS } from "../../providers/FilterProvider";

const MenuItems = [
  {
    title: "Показать всё",
    icon: ShowAllIcon,
    filter: FILTERS.All,
  },
  {
    title: "Показать выполненные",
    icon: ShowCompleteIcon,
    filter: FILTERS.Done,
  },
  {
    title: "Показать невыполненные",
    icon: ShowIncompleteIcon,
    filter: FILTERS.NotDone,
  },
];

const TodoBurgerMenu = ({ countTodos }) => {
  const [open, setOpen] = useState(false);
  const { filter, setFilter } = useFilter();

  const handleClick = filter => {
    setOpen(false);
    setFilter(filter);
  };

  const handleUnfocus = event => {
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
        onClick={_ => setOpen(prev => !prev)}
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
            onClick={_ => handleClick(item.filter)}
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
