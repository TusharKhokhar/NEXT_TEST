import React, { InputHTMLAttributes } from 'react'

type InputProps = any & {
  label: string
  id: string
  error?: string
}

const Input: React.FC<InputProps> = ({ label, id, error, ...props }) => {
  return (
    <div className="mb-3">
      <label
        className={`block uppercase tracking-wide ${error ? 'text-red-700' : 'text-gray-700'} text-xs font-bold mb-2`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${error ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-sky-500`}
        {...props}
      ></input>
      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}
    </div>
  )
}

export default Input
