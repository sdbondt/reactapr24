import { useMatch, useNavigate } from "react-router-dom"
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../services/taskSlice"
import { ITask } from "../../types/TaskTypes"
import { useEffect, useState } from "react"
import { setError, setLoading } from "../../services/uiSlice"
import { useDispatch } from "react-redux"

// Custom hook for managing task updates and deletions
const useTaskManagement = (task: ITask) => {
  // State to manage the content being edited in the update form
  const [updateContent, setUpdateContent] = useState(task.content)
  // State to toggle visibility of the update form
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  // State to toggle visibility of the delete confirmation form
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // useNavigate for programmatically navigating users
  const navigate = useNavigate()
  // useDispatch for dispatch rtk query actions
  const dispatch = useDispatch()
  // useMatch to check if the current URL is the detailed task view
  const match = useMatch("/tasks/:taskID")

  // RTK Query hooks for mutation operations
  const [
    deleteTask,
    {
      isError: isDeleteTaskError,
      isLoading: isDeleteTaskLoading,
      error: deleteTaskError,
    },
  ] = useDeleteTaskMutation()

  const [
    updateTask,
    {
      isError: isUpdateTaskError,
      isLoading: isUpdateTaskLoading,
      error: updateTaskError,
    },
  ] = useUpdateTaskMutation()

  // Effect to handle loading state updates
  useEffect(() => {
    dispatch(setLoading(isDeleteTaskLoading || isUpdateTaskLoading))
  }, [isDeleteTaskLoading, isUpdateTaskLoading])

  // Effect to handle error state updates
  useEffect(() => {
    if (isDeleteTaskError) dispatch(setError(deleteTaskError))
    if (isUpdateTaskError) dispatch(setError(updateTaskError))
  }, [updateTaskError, deleteTaskError])

  // Handler to update content state on user input
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setUpdateContent(e.target.value)

  // Toggle function for showing/hiding the update form
  const toggleUpdateForm = () => setShowUpdateForm((val) => !val)
  // Toggle function for showing/hiding the delete confirmation form
  const toggleDeleteModal = () => setShowDeleteModal((val) => !val)

  // Function to handle task update submissions
  const updateTaskHandler = async () => {
    try {
      await updateTask({
        task,
        content: updateContent,
      })
      toggleUpdateForm()
    } catch {
      dispatch(setError("Something went wrong while updating the task."))
    }
  }

  // Function to handle task deletion
  const deleteTaskHandler = async () => {
    try {
      await deleteTask(task)
      toggleDeleteModal()
      // Check if the current URL matches the task detail page pattern
      if (match && match.params.taskID === task.id.toString()) {
        // If so, navigate to the home or task list page after deletion
        navigate("/")
      }
    } catch {
      dispatch(setError("Something went wrong while deleting the task."))
    }
  }

  // Exposing state and handlers for use in components
  return {
    showUpdateForm,
    showDeleteModal,
    updateContent,
    deleteTaskHandler,
    updateTaskHandler,
    onContentChange,
    toggleUpdateForm,
    toggleDeleteModal,
  }
}

export default useTaskManagement
