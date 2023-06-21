import React from 'react';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import classNames from 'classnames' 

const PlanSidebarButton = () => {
    const registrationSteps = useSelector((state: RootState) => state.registrationSteps.value);
    const stepArray = ['Choose a Plan', 'Your Information', 'Done'];
    const buttonClass = classNames({
        'text-lg text-primary font-medium flex items-center border-complimentary rounded-full': true,
        'btn-pressed': '',
        'btn-over': ''
      });
    return (
        stepArray.map((step, index) => {
            return (
                <button className={buttonClass}>
                    <div></div>
                    {stepArray[index]}
                </button>
            )
        })
    )
}

export default PlanSidebarButton
