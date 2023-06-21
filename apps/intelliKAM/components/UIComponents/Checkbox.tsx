import React, { FC, ChangeEvent, CSSProperties, useState } from 'react';

interface CheckboxProps {
  checked: boolean;
  label?: string;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  style?: CSSProperties;
}

const Checkbox: FC<CheckboxProps> = ({
  checked,
  label = '',
  onChange,
  disabled = false,
  style = {}
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    onChange(newChecked);
  };

  const checkboxStyle: CSSProperties = {
    margin: '5px 0',
    fontFamily: 'Lato',
    padding: '10px 10px 10px 15px',
    border: '2px solid #E8EDEF',
    borderRadius: '4px',
    ...style // Merge additional custom styles with default styles
  };

  const checkboxInputStyle: CSSProperties = {
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    outline: 'none',
    marginBottom: '-6px',
    width: '25px',
    height: '25px',
    border: '2px solid #E8EDEF',
    borderRadius: '4px',
    backgroundColor: isChecked ? '#00C6C6' : '#E8EDEF',
    marginRight: '10px',
    cursor: 'pointer',
    position: 'relative',
  };

  const checkboxTickStyle: CSSProperties = {
    margin:"0px 20px 0px -29px",
    opacity: "0.9",
    display: isChecked ? 'inherit' : 'none',
    cursor: 'pointer',
  };

  return (
    <label style={checkboxStyle}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        style={checkboxInputStyle}
      />
      <span style={checkboxTickStyle}>&#10003;</span>
      {label}
    </label>
  );
};

export default Checkbox;
