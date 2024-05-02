import React from "react";
import { TextAreaProps } from "../../types/UITypes";

// Defines a reusable textarea component styled with Tailwind CSS.
const TextArea: React.FC<TextAreaProps> = ({
  name,
  value,
  placeholder,
  labelContent,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
        {labelContent}
      </label>
      <textarea
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
        rows={3} 
      />
    </div>
  );
}

export default TextArea;
