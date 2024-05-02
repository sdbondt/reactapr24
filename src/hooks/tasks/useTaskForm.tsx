import React, { useEffect, useState } from "react"
import { useCreateTaskMutation } from "../../services/taskSlice"
import { isLoading, setError, setLoading } from "../../services/uiSlice"
import { useDispatch } from "react-redux"

// Custom hook to manage the task form state and interactions
const useTaskForm = () => {
  // State for the task content input
  const [content, setContent] = useState("")

  // RTK Query hook for creating a task with state management for loading and errors
  const [
    createTask,
    {
      isError: isCreateTaskError,
      isLoading: isCreateTaskLoading,
      error: createTaskError,
    },
  ] = useCreateTaskMutation()

  // useDispatch for dispatch rtk query actions
  const dispatch = useDispatch()

  // Effect to handle loading state updates
  useEffect(() => {
    dispatch(setLoading(isCreateTaskLoading))
  }, [isCreateTaskLoading])

  // Effect to handle error state updates
  useEffect(() => {
    if (isCreateTaskError) dispatch(setError(createTaskError))
  }, [createTaskError, isCreateTaskError])

  // Handler for input changes to update the task content state
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value)

  // Handler for form submission
  const createTaskHandler = async () => {
    try {
      await createTask(content)
      setContent("")
    } catch {
      dispatch(setError("Something went wrong while creating the task."))
    }
  }

  // Return state and handlers to be used by a component
  return {
    content,
    onContentChange,
    createTaskHandler,
  }
}

export default useTaskForm
