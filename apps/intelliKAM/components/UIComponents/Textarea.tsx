import React, { FC, ChangeEvent, CSSProperties } from 'react';

interface TextAreaProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  rows?: number;
  cols?: number;
  style?: CSSProperties;
}

const TextArea: FC<TextAreaProps> = ({
  value,
  placeholder = '',
  onChange,
  disabled = false,
  rows = 3,
  cols = 30,
  style = {}
}) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const textAreaStyle: CSSProperties = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    resize: 'vertical',
    ...style // Merge additional custom styles with default styles
  };

  return (
    <textarea
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      disabled={disabled}
      rows={rows}
      cols={cols}
      style={textAreaStyle}
    />
  );
};

export default TextArea;