import useTaskForm from "../../hooks/tasks/useTaskForm"
import TaskForm from "./TaskForm"

const AddTaskForm = () => {
  const {
    onContentChange,
    createTaskHandler,
    content,
  } = useTaskForm()
  
  return (
    <TaskForm onChange={onContentChange} onSubmit={createTaskHandler} content={content} label="Add a new Task" />
  )
}

export default AddTaskForm
