import React from "react"
import { IUser } from "./UserTypes"

export interface ITaskState {
  q: string
  page: number
  limit: number
  direction: string
}

export interface ITask {
  id: number
  content: string
  user: IUser
  createdAt: string
  updatedAt: string
}

export interface TasksResponse {
  tasks: ITask[]
  page: number
  maxPage: number
}

export interface TaskResponse {
    task: ITask
}

export interface ConfirmDeleteProps {
  toggleDeleteModal: () => void
  deleteTaskHandler: () => void
}

export interface UpdateFormProps {
  toggleUpdateForm: () => void
  handleUpdateTask: () => void
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  updateContent: string
  isValidContent: boolean
}

export interface TaskFormProps {
  onSubmit: () => void
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  content: string
  label: string
  placeholder?: string
}