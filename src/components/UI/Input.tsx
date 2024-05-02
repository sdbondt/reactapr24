import React from 'react';
import { InputProps } from '../../types/UITypes';

// Defines a reusable input component with integrated validation feedback, styled with Tailwind CSS.
const Input: React.FC<InputProps> = ({
    type = 'text',
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    onKeyUp,
    errorMessage = '',
    isValid = true
}) => {
    return (
        <div className="mb-4">
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
                className={`shadow appearance-none border ${!isValid ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                            transition duration-200 ease-in-out`}
            />
            {!isValid && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
        </div>
    );
}

export default Input;
