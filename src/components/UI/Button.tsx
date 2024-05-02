import React, { useCallback } from "react"
import { ButtonProps } from "../../types/UITypes"

// Functional component for a generic button with customization options.
const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  disabled = false,
  children,
}) => {
  // Use useCallback to memoize the onClick handler if it is provided.
  const handleClick = useCallback(() => {
    if (onClick) onClick()
  }, [onClick])

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`bg-blue-500 text-white font-sans py-2 px-4 rounded transition duration-200 ease-in-out min-w-100px
                  ${
                    disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-600 hover:shadow-md"
                  }`}
    >
      {children}
    </button>
  )
}

export default Button
