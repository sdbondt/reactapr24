import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IRootState } from "../types/GlobalStateTypes"

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as IRootState).auth.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

export const api = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['Tasks'],
    endpoints: () => ({})
})
