import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { ReactNode } from "react"

export interface UiState {
  loading: boolean
  error: FetchBaseQueryError | SerializedError | undefined
}

export interface ButtonProps {
  type?: "submit" | "button"
  onClick?: () => void
  disabled?: boolean
  children: ReactNode
}

export interface InputProps {
  type?: "email" | "text" | "password"
  name: string
  value: string
  placeholder?: string
  isValid?: boolean
  errorMessage?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface TextAreaProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  name: string
  value: string
  labelContent: string
  placeholder?: string
}

export interface CustomFormProps {
  onSubmit: () => void
  disabledButton: boolean
  buttonText: string
  children: ReactNode
}

export interface ErrorOverlayProps {
  errorMessage: FetchBaseQueryError | SerializedError | undefined
}
