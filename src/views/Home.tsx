// Import necessary React components and icons
import { FiPlusCircle, FiMinus } from "react-icons/fi"
import AddTaskForm from "../components/tasks/AddTaskForm"
import TaskList from "../components/tasks/TaskList"
import { useEffect, useState } from "react"
import Button from "../components/UI/Button"
import Logout from "../components/auth/Logout"

// Defines the main page layout for task management.
const Home = () => {
  // State to control the visibility of the AddTaskForm component
  const [showAddTaskForm, setShowAddTaskForm] = useState(true)

  // Function to toggle the visibility state of the AddTaskForm
  const toggleShowAddTaskForm = () => setShowAddTaskForm((val) => !val)

  // Set the document title to "Tasks"
  useEffect(() => {
    document.title = 'Tasks'
  }, [])
 
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-xl px-4 py-4 text-center">
          <h1 className="text-xl font-bold">Tasks</h1>
          <Logout />
        </div>
        <Button onClick={toggleShowAddTaskForm}>
          {showAddTaskForm ? (
            <FiMinus className="text-lg" />
          ) : (
            <FiPlusCircle className="text-lg" />
          )}
        </Button>
        {showAddTaskForm && <AddTaskForm />}
        
        <TaskList />
      </div>
    </>
  )
}

export default Home
