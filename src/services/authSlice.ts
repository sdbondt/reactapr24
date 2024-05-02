import { createSlice } from "@reduxjs/toolkit"
import { IAuthState } from "../types/AuthTypes"
import { api } from "./api"

// Define the initial state for the auth module, pulling the initial token from localStorage.
const initialState: IAuthState = {
  token: localStorage.getItem("authToken") || null,
}

// authSlice for local token management.
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Sets the authentication token in both the state and localStorage.
    setToken: (state: IAuthState, { payload }) => {
      state.token = payload
      localStorage.setItem("authToken", payload)
    },
    // Clears the authentication token from both the state and localStorage.
    logout: (state: IAuthState) => {
      state.token = null
      localStorage.removeItem("authToken")
    },
  },
})

// Enhanced API slice with added endpoints for authentication
const extendedApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (credentials) => ({
                url: "/auth/signup",
                method: "POST",
                body: credentials
            })
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials
            })
        })
    })
})

export const { setToken, logout } = authSlice.actions
export const getToken = (state: { auth: IAuthState }) => state.auth.token
export const { useSignupMutation, useLoginMutation } = extendedApiSlice

export default authSlice.reducer
