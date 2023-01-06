import { createContext, useState, useContext } from "react";

const FilterContext = createContext();
export const useFilter = () => useContext(FilterContext);

export const FILTERS = {
  All: "all",
  Done: "done",
  NotDone: "notDone",
};

export default function FilterProvider({ children }) {
  const [filter, setFilter] = useState(FILTERS.All);

  const providerValue = {
    filter,
    setFilter,
  };

  return (
    <FilterContext.Provider value={providerValue}>
      {children}
    </FilterContext.Provider>
  );
}
