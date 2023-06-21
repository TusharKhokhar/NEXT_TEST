import React, { useState, useEffect } from 'react';

interface TimePickerProps {
  selectedTime?: string | null;
  onChange: (time: string | null) => void;
  minTime?: string;
  maxTime?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const TimePicker: React.FC<TimePickerProps> = ({
  selectedTime,
  onChange,
  minTime,
  maxTime,
  disabled,
  className,
  style
}) => {
  const [time, setTime] = useState<string | null>(selectedTime || null);

  useEffect(() => {
    setTime(selectedTime || null);
  }, [selectedTime]);

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputTime = event.target.value;
    setTime(inputTime);
    onChange(inputTime);
  };

  return (
    <input
      type="time"
      value={time || ''}
      onChange={handleTimeChange}
      min={minTime}
      max={maxTime}
      disabled={disabled}
      className={className}
      style={style}
    />
  );
};

export default TimePicker;
