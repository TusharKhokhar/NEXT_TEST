import React, { FC, ChangeEvent, CSSProperties } from 'react';

interface DropdownProps {
  value: string;
  options: string[];
  placeholder?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  style?: CSSProperties;
}

const Dropdown: FC<DropdownProps> = ({
  value,
  options,
  placeholder = '',
  onChange,
  disabled = false,
  style = {}
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  const dropdownStyle: CSSProperties = {
    padding: '0px 45px 0px 15px',
    border: '2px solid #020205',
    borderRadius: '3px',
    fontSize: '16px',
    width: '450px',
    height: "45px",
    boxSizing: 'border-box',
    background: "#E8EDEF",
    ...style // Merge additional custom styles with default styles
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={disabled}
      style={dropdownStyle}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;