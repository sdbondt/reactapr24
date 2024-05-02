import React from "react"
import { ITask } from "../../types/TaskTypes" 
import TaskManagement from "./TaskManagement" 
import { displayDate } from "../../utils/displayDate" 

// Define the SingleTask component that receives a task object conforming to the ITask interface.
const SingleTask: React.FC<ITask> = (task) => {
  const { content, createdAt, updatedAt } = task

  // Return the JSX for displaying the task item.
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <p className="text-gray-800 text-lg">{content}</p>{" "}
      <p className="text-gray-600 text-sm">Created: {displayDate(createdAt)}</p>{" "}
      {createdAt !== updatedAt && (
        <p className="text-gray-600 text-sm">
          Last updated: {displayDate(updatedAt)}
        </p>
      )}
      <TaskManagement {...task} />{" "}
    </div>
  )
}

export default SingleTask
