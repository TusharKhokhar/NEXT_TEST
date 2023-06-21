// import React, { useState, ChangeEvent } from 'react';

// interface ToggleProps {
//   label: string;
//   toggled: boolean;
//   onClick: (isToggled: boolean) => void;
// }

// const Toggle: React.FC<ToggleProps> = ({ label, toggled, onClick }) => {
//   const [isToggled, setIsToggled] = useState(toggled);

//   const handleToggle = () => {
//     const newToggledState = !isToggled;
//     setIsToggled(newToggledState);
//     onClick(newToggledState);
//   };

//   return (
//     <label className="relative inline-block w-14 h-7">
//       <input
//         type="checkbox"
//         checked={isToggled}
//         onChange={handleToggle}
//         className="opacity-0 w-0 h-0"
//       />
//       <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 ${isToggled ? ' bg-black border-2 border-solid border-black text-black rounded-24' : ' border-2 border-solid border-gray bg-gray-300 rounded-24'} transition duration-300 ease-in-out rounded-full`}></span>
//       <span
//         className={`absolute left-1 top-1.5 w-4 h-4 bg-white transition duration-300 ease-in-out rounded-full ${
//           isToggled ? 'transform translate-x-6' : ''
//         }`}
//       ></span>
//       <strong className="absolute left-full w-max line-height-7 ml-2 cursor-pointer">
//         {label}
//       </strong>
//     </label>
//   );
// };

// export default Toggle;
import React, { useState } from 'react';

interface ToggleProps {
  label: string;
  toggled: boolean;
  onClick: (isToggled: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, toggled, onClick }) => {
  const [isToggled, setIsToggled] = useState(toggled);

  const handleToggle = () => {
    const newToggledState = !isToggled;
    setIsToggled(newToggledState);
    onClick(newToggledState);
  };

  return (
    <label className="relative inline-block w-14 h-7">
      <input
        type="checkbox"
        checked={isToggled}
        onChange={handleToggle}
        className="opacity-0 w-0 h-0"
      />
      <span
        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 ${
          isToggled
            ? 'bg-white border-2 border-solid border-black '
            : 'border-2 border-solid border-gray-400 '
        } rounded-full transition duration-300 ease-in-out`}
      ></span>
      <span
        className={`absolute left-1 top-1.5 w-4 h-4 transition duration-300 ease-in-out rounded-full ${
          isToggled ? 'transform translate-x-6 bg-black' : 'bg-gray-400'
        }`}
      ></span>
      <strong className="absolute left-full w-max line-height-7 ml-2 cursor-pointer">
        {label}
      </strong>
    </label>
  );
};

export default Toggle;
