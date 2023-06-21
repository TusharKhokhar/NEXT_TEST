import React from 'react';

interface CardProps {
  title?: string;
  content: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  content,
  backgroundColor = 'bg-white',
  textColor = 'text-black',
  borderColor = 'border-gray-300'
}) => {
  return (
    <div
      className={`p-4 rounded-md shadow-md ${backgroundColor} ${textColor} border ${borderColor}`}
    >
      {title && <h3 className="mb-2">{title}</h3>}
      <div>{content}</div>
    </div>
  );
};

export default Card;
