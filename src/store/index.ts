import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { todoMiddleware } from "./middlewares/todo";

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(todoMiddleware)
})