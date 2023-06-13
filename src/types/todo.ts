export interface ITodo {
    id: string;
    title: string;
    detail: string;
    completed: boolean;
    pinned: boolean;
    createdTimestamp: number;
}

export type TodoInfo = Omit<ITodo, 'id' | 'createdTimestamp'>;

export interface ITodoState {
    todos: ITodo[];
}

export enum TodoActionTypes {
    ADD_TODO = "ADD_TODO",
    TOGGLE_TODO = "TOGGLE_TODO",
    REMOVE_TODO = "REMOVE_TODO",
    PIN_TODO = "PIN_TODO",
    CHANGE_TODO = "CHANGE_TODO",
    SET_TODOS = "SET_TODOS"
}

interface AddTodoAction {
    type: TodoActionTypes.ADD_TODO;
    payload: {todo: ITodo};
}

interface ChangeTodoAction {
    type: TodoActionTypes.CHANGE_TODO;
    payload: {todo: ITodo};
}

interface RemoveTodoAction {
    type: TodoActionTypes.REMOVE_TODO;
    payload: {id: string};
}

interface ToggleTodoAction {
    type: TodoActionTypes.TOGGLE_TODO;
    payload: {id: string};
}

interface PinTodoAction {
    type: TodoActionTypes.PIN_TODO;
    payload: {id: string};
}

interface SetTodosAction {
    type: TodoActionTypes.SET_TODOS;
    payload: {todos: ITodo[]};
}

export type TodoAction = 
    AddTodoAction | 
    ChangeTodoAction | 
    RemoveTodoAction | 
    ToggleTodoAction | 
    PinTodoAction |
    SetTodosAction;