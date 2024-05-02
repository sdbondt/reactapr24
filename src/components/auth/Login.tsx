import useAuthForms from "../../hooks/auth/useAuthForms"
import Input from "../UI/Input"
import CustomForm from "../UI/CustomForm"
import useAuthValidation from "../../hooks/auth/useAuthValidation"
import { EMAIL_ERROR } from "../../constants/errorMessages"

// Represents the login page where users can enter their credentials.
const Login = () => {
  // Hook managing form state and behavior.
  const {
    handleChanges,
    handleSubmit,
    credentials,
  } = useAuthForms("login")
  const { email, password } = credentials

  // Validation hook for the login form.
  const {
    isValidForm,
    isValidFields,
    onBlurHandler: onBlur,
    onKeyUp,
  } = useAuthValidation(credentials)
  const { isValidEmail } = isValidFields


  return (
    <CustomForm onSubmit={handleSubmit} buttonText="Login" disabledButton={!isValidForm}>
      <Input
        type="email"
        value={email}
        name="email"
        placeholder="Enter your email here."
        onChange={handleChanges}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        isValid={isValidEmail}
        errorMessage={EMAIL_ERROR}
      />
      <Input
        type="password"
        value={password}
        name="password"
        placeholder="Enter your password here."
        onChange={handleChanges}
      />
    </CustomForm>
  )
}

export default Login
