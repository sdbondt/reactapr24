import React from "react"
import Button from "../UI/Button"
import { ConfirmLogoutModalInterface } from "../../types/AuthTypes"
import { useDispatch } from "react-redux"
import { logout } from "../../services/authSlice"

// Component for confirming user logout action.
const ConfirmLogoutModal: React.FC<ConfirmLogoutModalInterface> = ({
  toggleLogoutModal, // Function to toggle the visibility of the modal.
}) => {
  const dispatch = useDispatch() // Hook to dispatch actions in Redux.

  // Handler that dispatches the logout action from authSlice.
  const logoutHandler = () => dispatch(logout())

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h6 className="text-lg font-semibold mb-4">
          Are you sure you want to logout?
        </h6>
        <div className="flex justify-between space-x-4">
          <Button onClick={logoutHandler}>Yes</Button>

          <Button onClick={toggleLogoutModal}>No</Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmLogoutModal
