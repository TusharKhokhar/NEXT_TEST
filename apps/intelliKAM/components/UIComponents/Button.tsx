import React, { FC, useState, useEffect, useRef } from 'react'
import classNames from 'classnames'

interface ButtonProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Button: FC<ButtonProps> = ({
  text,
  backgroundColor = "bg-gray-900",
  textColor = "text-white",
  onClick,
  disabled = false,
  style = {}
}) => {
  const [isDisabled, setIsDisabled] = useState(disabled);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsDisabled(disabled);
  }, [disabled]);

  const handleButtonClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  const buttonClasses = classNames(
    "m-0 py-2 px-3  text-sm font-bold rounded-full placeholder-opacity-75",
    backgroundColor,
    textColor,
    {
      "cursor-not-allowed opacity-50": isDisabled,
    }
  );

  return (
    <button
      ref={buttonRef}
      className={buttonClasses}
      style={style}
      onClick={handleButtonClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
