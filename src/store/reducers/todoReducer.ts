import { ITodoState, TodoAction, TodoActionTypes } from "../../types/todo";

//TODO: Оставить только CHANGE_TODO и в action creator уже добавить pin и complete, как вызов CHANGE_TODO с изменением соответствующих полей

const initialState: ITodoState = {
    todos: []
}

export const todoReducer = (
    state: ITodoState = initialState, 
    action: TodoAction
): ITodoState => {
    switch (action.type) {
        case TodoActionTypes.ADD_TODO:
            return {
                ...state, 
                todos: [
                    ...state.todos, 
                    action.payload.todo
                ]
            };
        case TodoActionTypes.CHANGE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload.todo.id) {
                        return action.payload.todo;
                    }
                    return todo;
                })
            };
        case TodoActionTypes.REMOVE_TODO:
            return {
               ...state,
                todos: state.todos.filter(todo => 
                    todo.id !== action.payload.id
                )
            };
        case TodoActionTypes.TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload.id) {
                        return {
                            ...todo,
                            completed: !todo.completed
                        };
                    }
                    return todo
                })
            }
        case TodoActionTypes.PIN_TODO:
            return {
                ...state, 
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload.id) {
                        return {
                            ...todo,
                            pinned: !todo.pinned
                        };
                    }
                    return todo
                })
            }
        case TodoActionTypes.SET_TODOS:
            return {
              ...state, 
                todos: action.payload.todos
            };
        case TodoActionTypes.SORT_TODOS:
            return {
                ...state, 
                todos: 
                    [...action.payload.todos].sort((left, right) => {
                        const comp = Number(!left.pinned) - Number(!right.pinned);
                        return comp ? comp : right.createdTimestamp - left.createdTimestamp;
                    })
            };
        default:
            return state;
    }
}