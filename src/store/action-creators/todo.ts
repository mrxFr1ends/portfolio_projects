import {v4 as uuidv4} from 'uuid';
import { ITodo, TodoAction, TodoActionTypes, TodoInfo } from "../../types/todo";
import { Dispatch } from "react";

// export const addTodo = (todo: ITodo): TodoAction => ({type: TodoActionTypes.ADD_TODO, payload: {todo}});

const defaultTodo: TodoInfo = {
    title: '',
    detail: '',
    completed: false,
    pinned: false
}

export const addTodo = ({title, detail, completed, pinned}: Partial<TodoInfo>) => {
    return (dispatch: Dispatch<TodoAction>) => {
        const todo: ITodo = {
            id: uuidv4(),
            title: title ? title : defaultTodo.title,
            detail: detail ? detail : defaultTodo.detail,
            completed: completed ? completed : defaultTodo.completed,
            pinned: pinned ? pinned : defaultTodo.pinned,
            createdTimestamp: Date.now()
        }
        dispatch({type: TodoActionTypes.ADD_TODO, payload: {todo}});
    }
};

export const changeTodo = (todo: ITodo): TodoAction => ({type: TodoActionTypes.CHANGE_TODO, payload: {todo}});

export const removeTodo = (id: string): TodoAction => ({type: TodoActionTypes.REMOVE_TODO, payload: {id}});

export const toggleTodo = (id: string): TodoAction => ({type: TodoActionTypes.TOGGLE_TODO, payload: {id}});

export const pinTodo = (id: string): TodoAction => ({type: TodoActionTypes.PIN_TODO, payload: {id}});

export const setTodos = (todos: ITodo[]): TodoAction => ({type: TodoActionTypes.SET_TODOS, payload: {todos}});

export const setLoadedTodos = (todos: ITodo[]): TodoAction => ({type: TodoActionTypes.SET_TODOS, payload: {todos}, meta: {isLoaded: true}});

export const sortTodos = (todos: ITodo[]): TodoAction => ({type: TodoActionTypes.SORT_TODOS, payload: {todos}});

export const loadTodos = () => {
    return (dispatch: Dispatch<TodoAction>) => {
        const todosString = localStorage.getItem('todos');
        let todos: ITodo[] = [];
        try {
            todos = todosString ? JSON.parse(todosString) : [];
        }
        catch (e) {}
        finally {
            dispatch(setLoadedTodos(todos));
        }
    }
};