import { useEffect, useState } from "react"
import Login from "../components/auth/Login"
import Signup from "../components/auth/Signup"
import Button from "../components/UI/Button"

// The Auth component is responsible for handling user authentication, including displaying
// either the login or signup forms based on user interaction.
const Auth = () => {
  // State to control which form to display. True shows the Login form, false shows the Signup form.
  const [showLogin, setShowLogin] = useState(true)

  // Handler to toggle between showing the Login and Signup forms.
  const toggleComponent = () => setShowLogin((val) => !val)

  // UseEffect to dynamically set the document title based on whether the user is viewing
  // the Login or Signup page.
  useEffect(() => {
    document.title = showLogin ? "Login page" : "Signup page"
  }, [showLogin])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div
        className="w-full max-w-md bg-white rounded-lg shadow-md flex flex-col justify-between"
        style={{ minHeight: "450px" }}
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">
            Welcome
          </h3>
          {showLogin ? <Login /> : <Signup />}
        </div>
        <div className="px-6 pb-6 pt-4 w-full">
          <Button onClick={toggleComponent}>
            {showLogin
              ? "No account yet? Signup here."
              : "Already got an account? Login here."}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Auth
