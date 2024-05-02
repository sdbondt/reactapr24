import { useParams } from "react-router-dom"
import { useGetTaskQuery } from "../services/taskSlice"
import TaskItem from "../components/tasks/SingleTask"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { setError, setLoading } from "../services/uiSlice"

const Task = () => {
  // Extract the taskID from the URL parameters
  const { taskID } = useParams()
  const dispatch = useDispatch()

  // Fetch the task using an RTK Query hook
  const {
    data: { task } = {},
    isLoading,
    isError,
    error,
  } = useGetTaskQuery(taskID)

  // Update document title
  useEffect(() => {
    document.title = "Task"
  }, [])

  // Set global loading state based on the query loading state
  useEffect(() => {
    dispatch(setLoading(isLoading))
  }, [isLoading, dispatch])

  // Set global error state based on the query error state
  useEffect(() => {
    if (isError && error) {
      dispatch(setError(error))
    }
  }, [isError, error, dispatch])

  // Display a styled message if no task is found
  if (!task)
    return (
      <p className="text-center text-lg text-gray-500 my-5">No task found</p>
    )

  // Render the TaskItem component when a task is found
  return <TaskItem {...task} />
}

export default Task
