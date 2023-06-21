import Image from 'next/image'
import rightArrow from '../../public/images/right_arrow.png'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  updateRegistrationStep,
  selectedPlan,
} from '../../store/slices/registrationSteps'
import classNames from 'classnames'

export default function ChoosePlanStep() {
  const dispatch = useDispatch()

  const [selectedPlanValue, setSelectPlan] = useState('' as string)
  const [termServicesValue, setTermServices] = useState(false as boolean)

  const selectPlan = async (e: any) => {
    setSelectPlan(e.target.value)
  }

  const handleSubmit = () => {
    dispatch(selectedPlan(selectedPlanValue))
    dispatch(updateRegistrationStep(1))
  }

  const termServices = async () => {
    setTermServices(!termServicesValue)
  }

  return (
    <div className="w-[76.28%] inner_container lg:ml-[360px] md:ml-[300px] sm:ml-[300px] ml-auto mr-auto">
      <div className="lg:pt-[46px] lg:pb-0 lg:pr-[100px] lg:pl-[100px] md:pt-[46px] md:pb-0 md:pr-[100px] md:pl-[100px] sm:pt-[40px] sm:px-[30px] px-[20px] pt-[20px] max-w-[944px] md:ml-0 xl:ml-0 2xl:m-auto">
        <div className="lg:mb-[42px] md:mb-[42px] sm:mb-[30px] mb-[30px]">
          <h1 className="lg:text-5xl md:text-5xl sm:text-[30px] text-[30px] text-primary font-extrabold">
            Choose a Plan
          </h1>
        </div>
        <div className="plan_outer relative">
          <input
            type="radio"
            id="html"
            className="z-10"
            name="choose-plan"
            value="Starter"
            onChange={(e) => {
              selectPlan(e)
            }}
          />
          <div className="plan_border lg:pt-[21px] lg:pb-7 lg:px-[27px] md:pt-[21px] md:pb-7 md:px-[27px] sm:px-[10px] sm:py-[10px] px-[10px] py-[10px] bg-white border-4 border-complimentaryLight rounded-xl">
            <div className="flex items-start">
              <div className="lg:pt-2 md:pt-2 sm:pt-0 pt-1">
                <div className="lg:w-7 lg:h-7 md:w-7 md:h-7 sm:w-4 sm:h-4 h-[20px] w-[20px] border-2 rounded-full border-complimentary inline-flex items-center justify-center plan_check">
                  <div className="lg:w-[12px] lg:h-[12px] md:w-[12px] md:h-[12px] sm:h-[7px] sm:w-[7px] w-[10px] h-[10px] bg-secondary rounded-full"></div>
                </div>
              </div>
              <div className="pl-4">
                <h2 className="lg:text-[28px] md:text-[28px] sm:text-[20px] text-[20px] font-medium text-primary mb-[6px]">
                  Starter
                </h2>
                <h5 className="lg:text-lg md:text-lg sm:text-[17px] text-[17px] font-extrabold text-primary lg:mb-[11px] sm:mb-[10px] mb-[5px]">
                  Pay-as-you-go
                </h5>
                <div className="flex">
                  <div>
                    <p className="lg:text-lg md:text-lg sm:text-[14px] text-[14px] font-normal text-primary lg:mb-[11px] sm:mb-[10px] mb-[5px]">
                      No monthly commitment
                    </p>
                    <p className="lg:text-lg md:text-lg sm:text-[14px] text-[14px] font-normal text-primary mb-0">
                      $7.50 per video
                    </p>
                  </div>
                  <div className="lg:ml-[23px] sm:ml-3 ml-2">
                    <p className="lg:text-lg md:text-lg sm:text-[14px] text-[14px] font-normal text-primary g:mb-[11px] sm:mb-[10px] mb-[5px]">
                      Unlimited campaigns
                    </p>
                    <p className="lg:text-lg md:text-lg sm:text-[14px] text-[14px] font-normal text-primary mb-0">
                      2 free videos included
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="plan_outer relative">
          <input
            type="radio"
            id="css"
            className="z-10"
            name="choose-plan"
            value="Corporate"
            onChange={(e) => {
              selectPlan(e)
            }}
          />
          <div className="plan_border lg:pt-[21px] lg:pb-7 lg:px-[27px] md:pt-[21px] md:pb-7 md:px-[27px] sm:px-[10px] sm:py-[10px] px-[10px] py-[10px] bg-white border-4 border-complimentaryLight rounded-xl mt-[22px]">
            <div className="flex items-start">
              <div className="lg:pt-2 md:pt-2 sm:pt-0 pt-1">
                <div className="lg:w-7 lg:h-7 md:w-7 md:h-7 sm:w-4 sm:h-4 h-[20px] w-[20px] border-2 rounded-full border-complimentary inline-flex items-center justify-center plan_check">
                  <div className="lg:w-[12px] lg:h-[12px] md:w-[12px] md:h-[12px] sm:h-[7px] sm:w-[7px] w-[10px] h-[10px] bg-secondary rounded-full"></div>
                </div>
              </div>
              <div className="pl-4">
                <h2 className="lg:text-[28px] md:text-[28px] sm:text-[20px] text-[20px] font-medium text-primary mb-[6px]">
                  Corporate
                </h2>
                <div className="flex mt-[12px] lg:flex-nowrap md:flex-nowrap sm:flex-wrap flex-wrap">
                  <div className="lg:w-1/3 md:w-1/3 sm:w-[48%] w-[48%]">
                    <p className="lg:text-lg sm:text-[14px] text-[14px] font-normal text-primary g:mb-[11px] sm:mb-[10px] mb-[5px]">
                      Unlimited campaigns
                    </p>
                    <p className="lg:text-lg sm:text-[14px] text-[14px] font-normal text-primary g:mb-[11px] sm:mb-[10px] mb-[5px]">
                      Unlimited users
                    </p>
                    <p className="lg:text-lg sm:text-[14px] text-[14px] font-normal text-primary g:mb-[11px] sm:mb-[10px] mb-[5px]">
                      Custom templates
                    </p>
                    <p className="lg:text-lg sm:text-[14px] text-[14px] font-normal text-primary mb-0">
                      Custom avatars
                    </p>
                  </div>
                  <div className="lg:ml-5 md:ml-5 sm:ml-3 ml-2 lg:w-1/3 md:w-1/3 sm:w-[48%] w-[48%]">
                    <p className="lg:text-lg sm:text-[14px] text-[14px] font-normal text-primary g:mb-[11px] sm:mb-[10px] mb-[5px]">
                      Custom voices
                    </p>
                    <p className="lg:text-lg sm:text-[14px] text-[14px] font-normal text-primary g:mb-[11px] sm:mb-[10px] mb-[5px] leading-[26px]">
                      Dedicated account management & support
                    </p>
                    <p className="lg:text-lg sm:text-[14px] text-[14px] font-normal text-primary g:mb-[11px] sm:mb-[10px] mb-[5px]">
                      Managed onboarding
                    </p>
                  </div>
                  <div className="lg:ml-5 md:ml-5 sm:ml-0 ml-0 lg:w-1/3 md:w-1/3 sm:w-[48%] w-[48%]">
                    <p className="lg:text-lg sm:text-[14px] text-[14px] font-normal text-primary g:mb-[11px] sm:mb-[10px] mb-[5px] leading-[26px]">
                      Training for your sales team
                    </p>
                    <p className="lg:text-lg sm:text-[14px] text-[14px] font-extrabold text-primary g:mb-[11px] sm:mb-[10px] mb-[5px]">
                      Plus much more...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[31px] mb-[30px] mr-[6px] flex items-center justify-end">
          <div className="relative w-5 h-5 input_checkbox">
            <input
              type="checkbox"
              id="plan-term"
              name="plan-term"
              value="Yes"
              className="absolute opacity-0 w-5 h-5 z-10"
              checked={termServicesValue}
              onChange={() => {
                termServices()
              }}
            />
            <span className="inline-block rounded h-5 w-5 bg-complimentaryLight"></span>
          </div>
          <span
            className="text-secondary text-sm font-bold inline-block ml-2"
            onClick={() => {
              termServices()
            }}
          >
            I have read and agree to the{' '}
            <a
              href="#"
              className="no-underline border-b border-secondary"
            >
              Terms of Service
            </a>
          </span>
        </div>

        <button
          className={classNames({
            'w-auto hove_button rounded-full ml-auto mt-8 lg:py-[13.5px] lg:px-[61px] md:py-[13.5px] md:px-[61px] sm:py-[10px] sm:px-[40px] py-[10px] px-[30px] relative  flex items-center font-extrabold text-sm justify-center':
              true,
            'bg-accentDark text-secondary':
              selectedPlanValue == '' || !termServicesValue,
            'bg-secondary text-white':
              selectedPlanValue != '' && termServicesValue,
          })}
          onClick={(e) => {
            handleSubmit()
          }}
          disabled={
            selectedPlanValue == '' || !termServicesValue ? true : false
          }
        >
          Continue
          <Image
            alt=""
            src={rightArrow}
            className="relative bottom-px left-1"
          />
        </button>
      </div>
    </div>
  )
}
