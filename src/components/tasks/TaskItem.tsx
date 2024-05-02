import React from "react"
import { ITask } from "../../types/TaskTypes"
import SingleTask from "./SingleTask"
import { Link } from "react-router-dom"

// TaskItem component displays a single task and provides a link to view detailed information.
const TaskItem: React.FC<ITask> = (task) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 hover:bg-gray-50 transition duration-300 ease-in-out">
      <SingleTask {...task} />
      <Link
        to={`/tasks/${task.id}`}
        className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
      >
        See Task
      </Link>
    </div>
  )
}

export default TaskItem
