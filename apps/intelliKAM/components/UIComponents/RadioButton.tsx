import React, { FC, ChangeEvent, CSSProperties, useState } from 'react';

interface RadioButtonProps {
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  disabled?: boolean;
  style?: CSSProperties;
  radioStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  name?: string;
}

const RadioButton: FC<RadioButtonProps> = ({
  value: initialValue,
  options,
  onChange,
  disabled = false,
  style = {},
  radioStyle = {},
  labelStyle = {},
  name = 'radioGroup',
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  const radioButtonCircleStyle: CSSProperties = {
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    outline: 'none',
    marginBottom: '-6px',
    width: '25px',
    height: '25px',
    border: '2px solid #E8EDEF', // Default border color for unselected buttons
    borderRadius: '50%',
    backgroundColor: 'transparent', // Transparent background for unselected buttons
    marginRight: '10px',
    cursor: 'pointer',
    position: 'relative',
    ...radioStyle, // Merge additional custom styles with default styles
  };

  const selectedRadioButtonCircleStyle: CSSProperties = {
    ...radioButtonCircleStyle,
    border: '2px solid #00C6C6', // Colorful border for the selected button
    backgroundColor: '#E8EDEF', // Background color for the selected button
  };

  const radioButtonDotStyle: CSSProperties = {
    position: 'absolute',
    display: 'none', // Hide the dot for unselected buttons
    margin: '0%',
    transform: 'translate(30%, -135%)',
    cursor: 'pointer',
  };

  const selectedRadioButtonDotStyle: CSSProperties = {
    ...radioButtonDotStyle,
    display: 'block', // Display the dot for the selected button
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    backgroundColor: '#020205', // Yellow color for the dot
  };

  const radioGroupStyle: CSSProperties = {
    margin: '5px 0',
    ...style, // Merge additional custom styles with default styles
  };

  return (
    <span style={radioGroupStyle}>
      {options.map((option) => (
        <label
          key={option.value}
          className="radio-label"
          style={{ marginRight: '10px', ...labelStyle }}
        >
        <div>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={handleChange}
            disabled={disabled}
            className="radio-input"
            style={
              value === option.value
                ? selectedRadioButtonCircleStyle
                : radioButtonCircleStyle
            }
          />
            <span
            className="custom-radio"
            style={
              value === option.value
                ? selectedRadioButtonDotStyle
                : radioButtonDotStyle
            }/>

          {option.label}
          </div>
        </label>
      ))}
    </span>
  );
};

export default RadioButton;
