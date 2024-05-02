import { useEffect, useReducer } from "react"
import { IAuthForm } from "../../types/AuthTypes"
import {
  setToken,
  useLoginMutation,
  useSignupMutation,
} from "../../services/authSlice"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { SerializedError } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setError, setLoading } from "../../services/uiSlice"

// Reducer function for managing changes in form fields.
const credentialsReducer = (state: IAuthForm, payload: Partial<IAuthForm>) => ({
  ...state,
  ...payload,
})

// Initial state setup for login form fields.
const initialLoginState: IAuthForm = {
  email: "",
  password: "",
}

// Initial state setup for signup form fields, extends login state with additional fields.
const initialSignupState: IAuthForm = {
  ...initialLoginState,
  username: "",
  confirmPassword: "",
}

// Custom hook for handling authentication forms. Supports both login and signup forms.
const useAuthForms = (type: "signup" | "login") => {
  // Determine initial state based on the form type.
  const initialFormState =
    type === "signup" ? initialSignupState : initialLoginState

  // State management for form credentials.
  const [credentials, dispatchCredentials] = useReducer(
    credentialsReducer,
    initialFormState
  )

  // Hook integrations for signup and login mutations.
  const [
    signup,
    { error: signupError, isError: isSignupError, isLoading: isSignupLoading },
  ] = useSignupMutation()
  const [
    login,
    { error: loginError, isError: isLoginError, isLoading: isLoginLoading },
  ] = useLoginMutation()

  // Redux dispatch and navigation hooks.
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Effect to handle loading state updates
  useEffect(() => {
    dispatch(setLoading(isSignupLoading || isLoginLoading))
  }, [isSignupLoading, isLoginLoading])

  // Effect to handle error state updates
  useEffect(() => {
    if (isSignupError) dispatch(setError(signupError))
    if (isLoginError) dispatch(setError(loginError))
  }, [signupError, loginError])

  // Handler for input changes, updating form state.
  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatchCredentials({
      [e.target.name]: e.target.value,
    })

  // Submit handler for the form. Performs either signup or login based on form type.
  const handleSubmit = async () => {
    try {
      let res:
        | { data?: { token: string } }
        | { error: FetchBaseQueryError | SerializedError } = {}

      // Execute the appropriate authentication mutation based on the form type.
      if (type === "signup") {
        res = await signup(credentials)
      }

      if (type === "login") {
        res = await login(credentials)
      }

      // If authentication is successful, set token and navigate to the home page.
      if ("data" in res && res.data) {
        dispatch(setToken(res.data.token))
        navigate("/")
      }
    } catch {
      dispatch(setError("Something went wrong."))
    }
  }
  // Return all relevant data and handlers for use in UI components.
  return {
    credentials,
    handleChanges,
    handleSubmit,
  }
}

export default useAuthForms
