import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";
import { UiState } from "../types/UITypes";

// Initial state for the UI slice managing loading and error states.
const initialState = {
    loading: false, 
    error: null   
}

// Slice for UI state management, including loading and error states.
const uiSlice = createSlice({
    name: 'ui', 
    initialState, 
    reducers: {
        // Action to set the loading state. True for loading, false otherwise.
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
        // Action to set an error message or object in the state.
        setError: (state, { payload }) => {
            state.error = payload;
        },
        // Action to clear any error in the state, resetting it to null.
        clearError: (state) => {
            state.error = null;
        }
    }
})

// Exported actions from the slice for use in components or middleware.
export const { setLoading, setError, clearError } = uiSlice.actions;

// Selector to get the loading state from the Redux store.
export const isLoading = (state: { ui: UiState }) => state.ui.loading;

// Selector to get the error state from the Redux store.
export const isError = (state: { ui: UiState }) => state.ui.error;

// Default export of the uiSlice reducer to be included in the store.
export default uiSlice.reducer;
