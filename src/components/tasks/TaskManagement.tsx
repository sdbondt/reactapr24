import React from "react"
import { FiTrash2, FiEdit3 } from "react-icons/fi"
import { ITask } from "../../types/TaskTypes"
import useTaskManagement from "../../hooks/tasks/useTaskManagement"
import Button from "../UI/Button"
import ConfirmDeleteModal from "./ConfirmDeleteModal"
import TaskForm from "./TaskForm"

// TaskManagement handles the UI for task operations such as deleting or updating tasks.
const TaskManagement: React.FC<ITask> = (task) => {
  // Extract state and functions from the useTaskManagement hook which manages task state logic.
  const {
    updateContent,
    deleteTaskHandler,
    updateTaskHandler,
    onContentChange,
    showUpdateForm,
    showDeleteModal,
    toggleUpdateForm,
    toggleDeleteModal,
  } = useTaskManagement(task)

  // Main component layout.
  return (
    <div className="flex flex-col items-start space-y-4">
      <div className="flex space-x-4">
        <Button onClick={toggleDeleteModal}>
          <FiTrash2 />
        </Button>
        <Button onClick={toggleUpdateForm}>
          <FiEdit3 />
        </Button>
      </div>
      {showDeleteModal && (
        <ConfirmDeleteModal
          toggleDeleteModal={toggleDeleteModal}
          deleteTaskHandler={deleteTaskHandler}
        />
      )}
      {showUpdateForm && (
        <div className="mt-2">
          <TaskForm
            onChange={onContentChange}
            onSubmit={updateTaskHandler}
            content={updateContent}
            label="Update your Task"
          />
        </div>
      )}
    </div>
  )
}

export default TaskManagement
