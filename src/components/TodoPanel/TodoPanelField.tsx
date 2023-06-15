import { useState } from "react";
import { TextField } from "@mui/material";
import { useActions } from "../../hooks/useActions";

const TodoPanelField: React.FC = () => {
    const [todoTitle, setTodoTitle] = useState("");
    const { addTodo } = useActions();

    const handleAddTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && todoTitle !== "") {
            addTodo({ title: todoTitle });
            setTodoTitle("");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodoTitle(event.target.value);
    }

    return (
        <TextField
            value={todoTitle}
            label="Todo"
            variant="filled"
            onChange={handleChange}
            onKeyUp={handleAddTodo}
            className="todo_panel__field"
        />
    );
};

export default TodoPanelField;
