import { getQueryString, useGetTasksQuery } from "../../services/taskSlice"
import { ITask } from "../../types/TaskTypes"
import TaskItem from "./TaskItem"
import { useDispatch, useSelector } from "react-redux"
import SearchBar from "./SearchBar"
import { useEffect } from "react"
import { setError, setLoading } from "../../services/uiSlice"

// TaskList component fetches and displays a list of tasks.
const TaskList = () => {
  // Search for tasks, based on the queryString
  const queryString = useSelector(getQueryString)
  const { data: { tasks = [] } = {}, isLoading, isError, error } = useGetTasksQuery(queryString)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(isLoading))
  }, [isLoading])

  useEffect(() => {
    if(isError) dispatch(setError(error))
  }, [error, isError])

  // Show a message if there are no tasks.
  if (tasks.length === 0)
    return <p className="text-center text-gray-500">No tasks</p>

  return (
    <section className="container mx-auto p-4">
      <SearchBar />
      <h3 className="text-xl font-semibold mb-3">Your tasks</h3>
      {tasks.map((task: ITask) => (
        <TaskItem key={task.id} {...task} />
      ))}
    </section>
  )
}

export default TaskList
