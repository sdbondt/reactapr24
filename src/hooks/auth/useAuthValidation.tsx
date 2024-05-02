import { useCallback, useEffect, useMemo, useReducer, useState } from "react"
import debounce from "lodash/debounce"
import {
  Fields,
  FormValidityAction,
  IAuthForm,
  IAuthFormValidity,
} from "../../types/AuthTypes"
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../utils/validators"

// Reducer function to update field validity based on current input values.
const isValidFieldsReducer = (
  state: IAuthFormValidity,
  { payload, field }: FormValidityAction
) => {
  const { email, username, password, confirmPassword } = payload
  if (field === "email") {
    return {
      ...state,
      isValidEmail: validateEmail(email),
    }
  }

  if (field === "username") {
    return {
      ...state,
      isValidUsername: validateUsername(username),
    }
  }

  if (field === "password" || field === "confirmPassword") {
    return {
      ...state,
      isValidPassword: validatePassword(password),
      isValidConfirmPassword: validateConfirmPassword(
        password,
        confirmPassword
      ),
    }
  }
  return state
}

// Initial state for form validation statuses.
const initialState: IAuthFormValidity = {
  isValidEmail: true,
  isValidPassword: true,
  isValidConfirmPassword: true,
  isValidUsername: true,
}

// Custom hook to manage form validation logic.
const useAuthValidation = (credentials: IAuthForm) => {
  // State management for overall form validity.
  const [isValidFields, dispatchIsValidFields] = useReducer(
    isValidFieldsReducer,
    initialState
  )

  // State to track if all form fields have been interacted with.
  const [allFieldsTouched, setAllFieldsTouched] = useState(false)

  // Effect to check if all form fields have been touched.
  useEffect(() => {
    const allTouched = Object.values(credentials).every(
      (value) => value.length > 0
    )
    setAllFieldsTouched(allTouched)
  }, [credentials])

  // Debounced validation function to reduce excessive validations during typing.
  const debouncedValidation = useCallback(
    debounce((field: Fields, payload: Partial<IAuthForm>) => {
      dispatchIsValidFields({
        field,
        payload,
      })
    }, 1500),
    []
  )

  // Handler for field blur events to trigger immediate validation.
  const onBlurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedCredentials = { ...credentials, [name]: value }
    dispatchIsValidFields({
      field: name as Fields,
      payload: {
        ...updatedCredentials,
      },
    })
  }

  // Handler for key up events to trigger debounced validation.
  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    const updatedCredentials = { ...credentials, [name]: value }
    debouncedValidation(name as Fields, updatedCredentials)
  }

  // Memoized value to determine if the entire form is valid.
  const isValidForm = useMemo(
    () =>
      allFieldsTouched &&
      Object.values(isValidFields).every((value) => value === true),
    [isValidFields, allFieldsTouched]
  )

  return { isValidFields, isValidForm, onBlurHandler, onKeyUp }
}

export default useAuthValidation
