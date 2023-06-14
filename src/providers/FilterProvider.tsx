import { createContext, useContext, useState } from "react";
import { FilterTypes, IFilterContext } from "../types/filter";
import { ITodo } from "../types/todo";

const FilterContext = createContext<IFilterContext>({} as IFilterContext);
export const useFilter = () => useContext(FilterContext);

export default function FilterProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [filter, setFilter] = useState(FilterTypes.ALL);

    const filterTodos = (todos: ITodo[]): ITodo[] => {
        if (filter === FilterTypes.COMPLETED)
            return todos.filter(todo => todo.completed);
        if (filter === FilterTypes.NOT_COMPLETED)
            return todos.filter(todo => !todo.completed);
        return todos;
    };

    const providerValue = {
        filter,
        setFilter,
        filterTodos,
    };

    return (
        <FilterContext.Provider value={providerValue}>
            {children}
        </FilterContext.Provider>
    );
}
