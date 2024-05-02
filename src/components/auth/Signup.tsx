import {
  CONFIRM_PASSWORD_ERROR,
  EMAIL_ERROR,
  PASSWORD_ERROR,
  USERNAME_ERROR,
} from "../../constants/errorMessages"
import {
  CONFIRM_PASSWORD_PLACEHOLDER,
  EMAIL_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
  USERNAME_PLACEHOLDER,
} from "../../constants/placeholders"
import useAuthForms from "../../hooks/auth/useAuthForms"
import useAuthValidation from "../../hooks/auth/useAuthValidation"
import { SignupPayload } from "../../types/AuthTypes"
import CustomForm from "../UI/CustomForm"
import Input from "../UI/Input"

// Signup component handling user registration with validation and form state management.
const Signup = () => {
  // Hook managing form state and behavior.
  const { handleChanges, handleSubmit, credentials } = useAuthForms("signup")
  const { email, username, password, confirmPassword } =
    credentials as SignupPayload

  // Validation hook for the signup form.
  const {
    isValidForm,
    isValidFields,
    onBlurHandler: onBlur,
    onKeyUp,
  } = useAuthValidation(credentials)
  const {
    isValidEmail,
    isValidPassword,
    isValidUsername,
    isValidConfirmPassword,
  } = isValidFields

  return (
    <CustomForm
      onSubmit={handleSubmit}
      buttonText="Signup"
      disabledButton={!isValidForm}
    >
      <Input
        type="email"
        value={email}
        name="email"
        onChange={handleChanges}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        isValid={isValidEmail}
        errorMessage={EMAIL_ERROR}
        placeholder={EMAIL_PLACEHOLDER}
      />
      <Input
        value={username}
        name="username"
        placeholder={USERNAME_PLACEHOLDER}
        onChange={handleChanges}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        isValid={isValidUsername}
        errorMessage={USERNAME_ERROR}
      />
      <Input
        type="password"
        value={password}
        name="password"
        placeholder={PASSWORD_PLACEHOLDER}
        onChange={handleChanges}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        isValid={isValidPassword}
        errorMessage={PASSWORD_ERROR}
      />
      <Input
        type="password"
        name="confirmPassword"
        placeholder={CONFIRM_PASSWORD_PLACEHOLDER}
        value={confirmPassword}
        onChange={handleChanges}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        isValid={isValidConfirmPassword}
        errorMessage={CONFIRM_PASSWORD_ERROR}
      />
    </CustomForm>
  )
}

export default Signup
