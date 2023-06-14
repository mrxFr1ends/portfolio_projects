import { Dispatch } from "@reduxjs/toolkit";
import { TodoAction, TodoActionTypes } from "../../types/todo";
import { RootState } from "../reducers";
import { sortTodos } from "../action-creators/todo";

export const todoSaveMiddleware = 
    (store: { dispatch: Dispatch<TodoAction>, getState: () => RootState }) => 
    (next: Dispatch<TodoAction>) => 
    (action: TodoAction) => 
{
    const result = next(action);
    const savedActions = [
        TodoActionTypes.ADD_TODO, 
        TodoActionTypes.CHANGE_TODO, 
        TodoActionTypes.REMOVE_TODO, 
        TodoActionTypes.TOGGLE_TODO, 
        TodoActionTypes.PIN_TODO
    ];
    if (savedActions.includes(action.type) || (action.type === TodoActionTypes.SET_TODOS && !action.meta?.isLoaded)) {
        const { todos } = store.getState().todo;
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    return result;
};

export const todoSortMiddleware = 
    (store: { dispatch: Dispatch<TodoAction>, getState: () => RootState }) => 
    (next: Dispatch<TodoAction>) => 
    (action: TodoAction) => 
{
    const result = next(action);
    if (
        action.type === TodoActionTypes.ADD_TODO || 
        action.type === TodoActionTypes.CHANGE_TODO || 
        action.type === TodoActionTypes.PIN_TODO
    ) {
        const { todos } = store.getState().todo;
        store.dispatch(sortTodos(todos));
    }
    return result;
};