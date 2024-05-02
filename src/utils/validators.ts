import { EMAIL_REGEX, PASSWORD_REGEX } from "../constants/regex"

// Validates if the provided email address meets the defined regex pattern.
export const validateEmail = (email: string | undefined): boolean => {
    return email ? EMAIL_REGEX.test(email): false
}

// Validates if the provided password meets the defined regex pattern.
export const validatePassword = (password: string | undefined): boolean => {
    return password ? PASSWORD_REGEX.test(password): false
}

// Checks if the confirmPassword matches the original password and is not just a single character.
// Returns true to avoid blocking submission when confirmPassword is initially empty.
export const validateConfirmPassword = (password: string | undefined, confirmPassword: string | undefined): boolean => {
  if (confirmPassword && confirmPassword.length) return password === confirmPassword
  else return true
}

// Validates if the username is between 2 and 20 characters.
export const validateUsername = (username: string | undefined): boolean => {
  return username && username.trim().length > 1 && username.trim().length < 21 ? true: false
}