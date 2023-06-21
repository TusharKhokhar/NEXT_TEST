import React from 'react'
import Image from 'next/image'
import planLogo from '../public/images/plan_logo.png'
import tickLogo from '../public/images/tick.svg'
import { RootState } from '../store/store'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import classNames from 'classnames' 

const PlanSidebar = () => {
  const{pathname} = useRouter();
  const registrationSteps = useSelector(
    (state: RootState) => state.registrationSteps.value
  )
  const stepArray = ['Choose a Plan', 'Your Information', 'Done'];
  return (
    <div className="lg:w-[360px] fixed md:w-[360px] sm:w-[300px] w-[300px] lg:block md:block sm:block hidden bg-complimentaryLight h-screen lg:pl-[35px] lg:pr-[34px] lg:py-[60px] md:pl-[35px] md:pr-[34px] md:py-[60px] sm:px-[20px] sm:py-[20px] px-[20px] py-[20px] text-center">
      <div>
        <Image src={planLogo} alt="" className="relative left-[-2px]" />
      </div>
      {
        pathname !== '/verification' ? 
        <div className="lg:mt-[69px] sm:mt-[40px] mt-[30px]">
        {stepArray.map((step, index) => {
          return (
            <button
              key={index}
              className={classNames({
                'text-lg text-primary font-medium flex items-center border-complimentary rounded-full':
                  true,
                'mb-[-1px] lg:py-[10.91px] lg:px-[23px] md:py-[10.91px] md:px-[23px] sm:py-[10.91px] sm:px-[23px] py-[8px] px-[13px] border-2 w-full':
                  registrationSteps === 0 && index === 0,
                'mb-[10px] lg:px-6 md:px-6 lg:py-[23px] md:py-[23px] sm:px-6 sm:py-[23px] px-3 py-[15px] border-0 w-full':
                  registrationSteps === 0 && index === 1,
                'py-0 px-6 border-0 w-full':
                  registrationSteps === 0 && index === 2,
                'border-0 pt-[12px] pb-[22px] pl-[15px] w-72':
                  registrationSteps === 1 && index === 0,
                'border-2 lg:py-[10.91px] lg:px-[23px] md:py-[10.91px] md:px-[23px] sm:py-[10.91px] sm:px-[23px] py-[8px] px-[13px] w-full':
                  registrationSteps === 1 && index === 1,
                'border-0 lg:py-[23px] lg:px-6 md:py-[23px] md:px-6 sm:py-[23px] sm:px-6 px-3 py-[15px] w-72':
                  registrationSteps === 1 && index === 2,
                'border-0 pt-[12px] pb-[22px] pl-[17px] w-72':
                  registrationSteps === 2,
              })}
            >
              {registrationSteps === 0 || registrationSteps === 1 ? (
                registrationSteps === 1 && index === 0 ? (
                  <div className="mr-[10px]">
                    <Image src={tickLogo} alt="" />
                  </div>
                ) : (
                  <div
                    className={classNames({
                      'w-3 mr-[18px] h-3 border-2 rounded-full inline-block':
                        true,
                      'bg-complimentary border-complimentary':
                        (registrationSteps == 0 && index === 0) ||
                        (registrationSteps == 1 && index === 1),
                      'bg-accentDark border-accentDark':
                        (registrationSteps == 0 && index === 1) ||
                        (registrationSteps == 0 && index === 2) ||
                        (registrationSteps == 1 && index === 2),
                    })}
                  ></div>
                )
              ) : (
                <div className="mr-[10px]">
                  <Image src={tickLogo} alt="" />
                </div>
              )}
              {stepArray[index]}
            </button>
          )
        })}
      </div> : ''
      }
    </div>
  )
}

export default PlanSidebar;
