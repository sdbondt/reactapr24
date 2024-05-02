import { useState } from "react"
import Button from "../UI/Button"
import ConfirmLogoutModal from "./ConfirmLogout"

// The Logout component allows the user to trigger the logout process.
const Logout = () => {
  // State to control the visibility of the logout confirmation modal.
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  // Function to toggle the visibility of the logout confirmation modal.
  const toggleLogoutModal = () => setShowLogoutModal((val) => !val)

  return (
    <>
      <Button onClick={toggleLogoutModal}>Logout</Button>

      {showLogoutModal && (
        <ConfirmLogoutModal toggleLogoutModal={toggleLogoutModal} />
      )}
    </>
  )
}

export default Logout
