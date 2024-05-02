import React from "react"
import { CustomFormProps } from "../../types/UITypes"
import Button from "./Button"

// Functional component for a customizable form wrapper.
const CustomForm: React.FC<CustomFormProps> = ({ onSubmit, buttonText, disabledButton, children }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit()
  }
  return <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
    <div>{children}</div>
    <Button type="submit" disabled={disabledButton} >{ buttonText}</Button>
  </form>
}

export default CustomForm


