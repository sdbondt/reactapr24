import { createSelector, createSlice } from "@reduxjs/toolkit"
import { TaskResponse, TasksResponse, ITask, ITaskState } from "../types/TaskTypes"
import { api } from "./api"
import { IRootState } from "../types/GlobalStateTypes"
import { createQuerystring } from "../utils/createQuerystring"

const initialState: ITaskState = {
  q: "",
  limit: 5,
  direction: "desc",
  page: 1,
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSearchParams: (state, { payload }) => {
      Object.assign(state, payload)
    },
  },
})

// Enhanced API slice with added endpoints for task management
const extendedApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint to fetch tasks, potentially with additional query parameters
    getTasks: builder.query({
      query: (queryString = "") => "/tasks" + queryString,
      // Transform page and maxPage to numeric values.
      transformResponse: (response: any) => ({
        ...response,
        page: Number(response.page),
        maxPage: Number(response.maxPage),
        tasks: response.tasks,
      }),
      // Tagging fetched tasks for cache updates
      providesTags: (result?: TasksResponse) => {
        if (result) {
          return [
            ...result.tasks.map((task: ITask) => ({
              type: "Tasks" as const,
              id: task.id.toString(),
            })),
            { type: "Tasks", id: "LIST" },
          ]
        }
        return [{ type: "Tasks", id: "LIST" }]
      },
    }),
    // Endpoint to fetch a single task by ID
    getTask: builder.query({
      query: (taskID) => `/tasks/${taskID}`,
      // Tagging the fetched task for cache updates
      providesTags: (result?: TaskResponse) => {
        if (result) return [{ type: "Tasks", id: result.task.id.toString() }]
        return []
      },
    }),
    // Endpoint to create a new task
    createTask: builder.mutation({
      query: (content) => ({
        url: "/tasks",
        method: "POST",
        body: {
          content,
        },
      }),
      // Invalidates task list cache after creation to ensure data consistency
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
    // Endpoint to update an existing task
    updateTask: builder.mutation({
      query: ({ task, content }) => ({
        url: `/tasks/${task.id}`,
        method: "PATCH",
        body: {
          content,
        },
      }),
      // Invalidates tags of the updated task and the task list
      invalidatesTags: (result?: TaskResponse) =>
        result
          ? [
              { type: "Tasks", id: result.task.id.toString() },
              { type: "Tasks", id: "LIST" },
            ]
          : [],
    }),
    // Endpoint to delete a task
    deleteTask: builder.mutation({
      query: (task) => ({
        url: `/tasks/${task.id}`,
        method: "DELETE",
      }),
      // Invalidates tags of the deleted task and the task list
      invalidatesTags: (_, __, task) =>
        task
          ? [
              { type: "Tasks", id: task.id.toString() },
              { type: "Tasks", id: "LIST" },
            ]
          : [],
    }),
  }),
})

// Exporting hooks for each operation, allowing easy access within components
export const {
  useCreateTaskMutation,
  useGetTaskQuery,
  useGetTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = extendedApiSlice

// Export the `setSearchParams` action creator from the task slice's automatically generated actions.
export const { setSearchParams }  = tasksSlice.actions

// Selector to retrieve the search parameters state slice from the root state.
export const getSearchParams = (state: IRootState) => state.tasks

// Selector to derive the query string from the tasks state using a reselect selector for memoization.
// This selector will compute the query string only when the tasks state changes,
export const getQueryString = createSelector(
  getSearchParams,
  (searchParamsObject) => createQuerystring(searchParamsObject)
)

// Export the reducer associated with the tasks slice. 
export default tasksSlice.reducer
