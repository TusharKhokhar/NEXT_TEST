import React, { useRef, useState } from 'react';

interface FormDateInputProps {
  label: string;
}

const FormDateInput: React.FC<FormDateInputProps> = ({ label }) => {
  const [startDate, setStartDate] = useState('Start Date');
  const [endDate, setEndDate] = useState('End Date');

  const datePickerRef1 = useRef<HTMLInputElement>(null);
  const datePickerRef2 = useRef<HTMLInputElement>(null);

  const handleStartDate = () => {
    console.log('Hello console', datePickerRef1);
    datePickerRef1.current?.showPicker();
  };

  const handleEndDate = () => {
    console.log('Hello console2');
    datePickerRef2.current?.showPicker();
  };

  const pickStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const pickEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  return (
    <div className="inputConatiner w-60 mt-4">
      <div className="inputLabel font-bold text-sm text-black">{label}</div>
      <div className="inputContainerWrapper bg-gray-300 rounded-md p-2 my-4">
        <div className="inputLeft flex justify-center">
          <div className="dateText cursor-pointer" onClick={handleStartDate}>
            {startDate}
          </div>
          <div className="dateText">-</div>
          <input
            type="date"
            ref={datePickerRef1}
            onChange={pickStart}
            className="hidden"
          />
          <div className="dateText cursor-pointer" onClick={handleEndDate}>
            {endDate}
          </div>
          <input
            type="date"
            ref={datePickerRef2}
            onChange={pickEnd}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default FormDateInput;
