import { useState } from "react";
import { useActions } from "../../hooks/useActions";
import { ITodo } from "../../types/todo";
import { deepEqual } from "../../utils";
import { TextField, Checkbox, Button, Stack, FormGroup, FormControlLabel } from "@mui/material";
import "./TodoForm.css";

interface TodoFormProps {
    item: ITodo;
    onSubmit: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ item, onSubmit }) => {
    const [todo, setTodo] = useState<ITodo>({ ...item });
    const { changeTodo } = useActions();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { type, name, value, checked } = event.target;
        setTodo({ ...todo, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!deepEqual(item, todo)) changeTodo(todo);
        onSubmit();
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="todo_form"
        >
            <Stack spacing={2}>
                <TextField
                    name="title"
                    label="Заголовок"
                    className="todo_form__field"
                    value={todo.title}
                    onChange={handleChange}
                />
                <TextField
                    multiline
                    minRows={2}
                    maxRows={5}
                    name="detail"
                    label="Детали"
                    className="todo_form__field"
                    value={todo.detail}
                    onChange={handleChange}
                />
                <FormGroup className="todo_form__row">
                    <Stack direction="row" sx={{justifyContent: "space-around"}}>
                        <FormControlLabel label="Выполнено"
                        sx={{margin: "0 20% 0 0"}} control={
                            <Checkbox
                                className="todo_form__checkbox"
                                name="completed"
                                checked={todo.completed}
                                onChange={handleChange}
                            />
                        }/>
                        <FormControlLabel label="Закреплено" sx={{margin: 0}} control={
                            <Checkbox
                                className="todo_form__checkbox"
                                name="pinned"
                                checked={todo.pinned}
                                onChange={handleChange}
                            />
                        }/>
                    </Stack>
                </FormGroup>
                <Button 
                    className="todo_form__save" 
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Сохранить изменения
                </Button>
            </Stack>
        </form>
    );
};

export default TodoForm;
