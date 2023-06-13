import { Dispatch } from "@reduxjs/toolkit";
import { TodoAction, TodoActionTypes } from "../../types/todo";
import { RootState } from "../reducers";

export const todoMiddleware = 
    (store: { getState: () => RootState }) => 
    (next: Dispatch<TodoAction>) => 
    (action: TodoAction) => 
{
    if (Object.values(TodoActionTypes).includes(action.type)) {
        const result = next(action);
        const { todos } = store.getState().todo;
        localStorage.setItem("todos", JSON.stringify(todos));
        return result;
    }
    return next(action);
};