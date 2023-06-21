import classNames from 'classnames'
import React, { FC, ChangeEvent, CSSProperties } from 'react'

interface InputProps {
  value: string
  label?: string
  placeholder?: string
  onChange: (value: string) => void
  disabled?: boolean
  style?: CSSProperties
  className?: string
}

const FormInput: FC<InputProps> = ({
  value,
  placeholder,
  onChange,
  disabled = false,
  style = {},
  className,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const inputStyle: CSSProperties = {
    padding: '0px 8px 0px 15px',
    border: '2px solid #E8EDEF',
    borderRadius: '3px',
    background: '#E8EDEF',
    fontSize: '16px',
    width: '450px',
    height: '45px',
    boxSizing: 'border-box',
    ...style, // Merge additional custom styles with default styles
  }

  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      disabled={disabled}
      className={classNames(
        'rounded-[3px] bg-complimentaryLight text-[14px] font-bold leading-[17px] w-[450px] h-[45px] px-[15px] py-[14px] border-2 rounded-[3px] placeholder:font-normal placeholder:text-secondary placeholder:opacity-75 focus:border-secondary disabled:bg-accentDark',
        className
      )}
    />
  )
}

export default FormInput
