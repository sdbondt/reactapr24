import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import authReducer from '../services/authSlice'
import taskReducer from '../services/taskSlice'
import uiReducer from '../services/uiSlice'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        'auth': authReducer,
        'tasks': taskReducer,
        'ui': uiReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})