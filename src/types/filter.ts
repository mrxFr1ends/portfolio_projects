import { ITodo } from "./todo";

export enum FilterTypes {
    ALL = "ALL",
    COMPLETED = "COMPLETED",
    NOT_COMPLETED = "NOT_COMPLETED",
};

export interface IFilterContext {
    filter: FilterTypes;
    setFilter: (filter: FilterTypes) => void;
    filterTodos: (todos: ITodo[]) => ITodo[];
}