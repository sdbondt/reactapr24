import React from "react"
import { ErrorOverlayProps } from "../../types/UITypes"
import displayError from "../../utils/displayError"
import { useDispatch } from "react-redux"
import { clearError } from "../../services/uiSlice"
import Button from "./Button"

// Overlay to cover the viewport and center the error message
const ErrorOverlay: React.FC<ErrorOverlayProps> = ({ errorMessage }) => {
  const dispatch = useDispatch()
  // Handle click on the overlay to close it
  const closeOverlay = () => {
    dispatch(clearError())
  }

  // Prevent the click from propagating to the overlay when the error message box is clicked
  const handleMessageBoxClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => e.stopPropagation()

  return (
    // Overlay to cover the viewport and center the error message
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={closeOverlay}
    >
      <div
        className="bg-white p-4 md:p-8 rounded-lg shadow-lg max-w-lg w-full mx-4"
        onClick={handleMessageBoxClick}
      >
        <p className="text-red-500 font-medium text-center text-sm md:text-lg">
          {displayError(errorMessage)}
        </p>
        <Button onClick={closeOverlay}>OK</Button>
      </div>
    </div>
  )
}

export default ErrorOverlay
