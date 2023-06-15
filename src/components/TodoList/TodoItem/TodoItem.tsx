import { memo } from "react";
import { useActions } from "../../../hooks/useActions";
import { ITodo } from "../../../types/todo";
import { deepEqual } from "../../../utils";
import "./TodoItem.css";
import { Checkbox, IconButton, ListItem, ListItemText, Stack } from "@mui/material";
import { Close, PushPin, PushPinOutlined } from "@mui/icons-material";

interface TodoItemProps {
    todo: ITodo;
    onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
}

// TODO: добавить в reducer или создать новый где будет открытие модального окна
// TODO: и чтобы изменялся selectedTodo, а не прокидывать onClick, onSelect и т.д.
const TodoItem: React.FC<TodoItemProps> = ({ todo, onClick }) => {
    const { toggleTodo, pinTodo, removeTodo } = useActions();

    const togglePinTodo = (event: React.MouseEvent) => {
        event.stopPropagation();
        pinTodo(todo.id);
    };

    const removeTodoClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        removeTodo(todo.id);
    };

    return (
        <ListItem
            className="todo__item"
            disablePadding
            onClick={onClick}
            secondaryAction = {
                <Stack direction="row" spacing={1}>
                    <IconButton  
                        onClick={togglePinTodo}
                        className={"todo__pin " + (todo.pinned ? "active" : "")}
                    >
                        {todo.pinned
                            ? <PushPin 
                                sx={{
                                    transform: 'rotate(45deg)',
                                    transition: "0.3s all ease-in"
                                }}
                            />
                            : <PushPinOutlined />
                        }
                    </IconButton>
                    <IconButton 
                        onClick={removeTodoClick}
                        className="todo__remove"
                    >
                        <Close />
                    </IconButton>
                </Stack>
            }
        >
            <Checkbox
                edge="start"
                checked={todo.completed}
                onChange={_ => toggleTodo(todo.id)}
                onClick={e => e.stopPropagation()}
                tabIndex={-1}
                sx={{marginRight: 2, transition: "0.3s all ease-in"}}
            />
            <ListItemText 
                id={`checkbox-list-label-${todo.id}`} 
                primary={todo.title} 
            />
        </ListItem>
    );
};

export default memo(TodoItem, (prev, next) => deepEqual(prev.todo, next.todo));
