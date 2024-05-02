import React, { useMemo } from "react"
import { TaskFormProps } from "../../types/TaskTypes"
import CustomForm from "../UI/CustomForm"
import TextArea from "../UI/TextArea"

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onChange,
  content,
  label,
  placeholder,
}) => {
  // Memoized value to determine if the current content is valid
  const isValidContent = useMemo(() => {
    return content.length > 0 && content.length <= 100
  }, [content])

  return (
    <CustomForm
      onSubmit={onSubmit}
      buttonText={label}
      disabledButton={!isValidContent}
    >
      <TextArea
        name="content"
        labelContent={label}
        value={content}
        onChange={onChange}
        placeholder={placeholder}
      />
      <div className="h-6">
        {content.length > 100 && (
          <p className="text-red-500 text-xs italic">
            Tasks can only be 100 characters long.
          </p>
        )}
      </div>
    </CustomForm>
  )
}

export default TaskForm
