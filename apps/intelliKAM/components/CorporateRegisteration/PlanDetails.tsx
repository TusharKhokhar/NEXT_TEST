import { useDispatch } from 'react-redux'
import Steps from './Steps'
import {
  corporateRegistrationSlice,
  corporateRegistrationStep,
} from '../../store/slices/corporateRegistration'
import { useState } from 'react'
import { planDetailsObject } from '../../constants/constants'
import classNames from 'classnames'
import Image from 'next/image'
import rightArrow from '../../public/images/right_arrow.png'

const PlanDetails = () => {
  const dispatch = useDispatch()
  const [isFormValid, setIsFormValid] = useState(true)
  const [planDetails, setPlanDetails] = useState(planDetailsObject)

  const handleInput = (e: any) => {
    setPlanDetails({ ...planDetails, [e.target.name]: e.target.value })
    if(e.target.name === 'videoCreditsIncluded' && e.target.value === ''){
      setPlanDetails({ ...planDetails, [e.target.name]: "0" })
    }
    if (!checkValidation({ ...planDetails, [e.target.name]: e.target.value })) {
      setIsFormValid(false)
    } else {
      setIsFormValid(true)
    }

  }

  const checkValidation = (formData: any) => {
    if (
      formData.planType.trim() == '' ||
      formData.subscriptionModel.trim() == '' ||
      formData.renewalPeriod.trim() == '' ||
      formData.ratePerVideo.trim() == '' ||
      formData.videoCreditsIncluded.trim() == '' ||
      formData.videoCreditsFrequency.trim() == '' ||
      formData.paymentMethods.trim() == '' ||
      formData.paymentTerms.trim() == '' ||
      formData.paymentDueDate.trim() == ''
    ) {
      return true
    }
    return false
  }

  const handleSubmit = () => {
    dispatch(corporateRegistrationSlice.actions.planDetails(planDetails))
    dispatch(corporateRegistrationStep(3))
  }

  return (
    <>
      <Steps />
      <div className="w-[47.5%] m-auto">
        <h2 className="text-[28px] text-primary font-medium">Plan Details</h2>

        <form action="" method="post" className="mt-[29px] pr-[30px]">
          <div className="flex flex-col space-x-[26px]">
            <div className="w-full flex items-center justify-start space-x-[30px]">
              <label
                htmlFor="plan-type"
                className="text-sm text-secondary font-bold block mb-0 text-right w-[28.3444%]"
              >
                Plan Type
              </label>
              <div className="w-[71%] flex space-x-5">
                <div className="flex plan_outer space-x-2">
                  <label className="relative">
                    <input
                      type="radio"
                      name="planType"
                      value="Starter"
                      className="absolute w-full h-full opacity-0 z-10"
                      onChange={(e) => {
                        handleInput(e)
                      }}
                    />
                    <div className="w-[20px] h-[20px] border-2 rounded-full border-complimentaryLight bg-complimentaryLight flex items-center justify-center rounded-full block plan_border">
                      {planDetails.planType == 'Starter' ? (
                        <div className="w-[8px] h-[8px] m-auto bg-secondary rounded-full"></div>
                      ) : (
                        ''
                      )}
                    </div>
                  </label>
                  <label
                    htmlFor="Starter"
                    className="text-sm text-secondary font-bold"
                  >
                    Starter
                  </label>
                </div>
                <div className="flex plan_outer space-x-2">
                  <label className="relative">
                    <input
                      type="radio"
                      name="planType"
                      value="Corporate"
                      className="absolute w-full h-full opacity-0 z-10"
                      onChange={(e) => {
                        handleInput(e)
                      }}
                    />
                    <div className="w-[20px] h-[20px] border-2 rounded-full border-complimentaryLight bg-complimentaryLight flex items-center justify-center rounded-full block plan_border">
                      {planDetails.planType == 'Corporate' ? (
                        <div className="w-[8px] h-[8px] m-auto bg-secondary rounded-full"></div>
                      ) : (
                        ''
                      )}
                    </div>
                  </label>
                  <label
                    htmlFor="Corporate"
                    className="text-sm text-secondary font-bold"
                  >
                    Corporate
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-x-[26px] mt-[20px]">
            <div className="w-full flex items-center justify-start space-x-[30px]">
              <label
                htmlFor="subscription-model"
                className="text-sm text-secondary font-bold block mb-0 text-right w-[28.3444%]"
              >
                Subscription Model
              </label>
              <div className="w-[71%] flex space-x-5">
                <select
                  name="subscriptionModel"
                  value={planDetails.subscriptionModel}
                  className="pl-[15px] outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full pt-[10px] h-[45px] pb-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                  id="subscription-model"
                  onChange={(e) => {
                    handleInput(e)
                  }}
                >
                  <option value="Pay-As-You-Go" selected>
                    Pay-As-You-Go
                  </option>
                  <option value="Pay-As-You-Go">Pay-As-You-Go</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-x-[26px] mt-[20px]">
            <div className="w-full flex items-center justify-start space-x-[30px]">
              <label
                htmlFor="Renewal"
                className="text-sm text-secondary font-bold block mb-0 text-right w-[28.3444%]"
              >
                Renewal Period
              </label>
              <div className="w-[71%] flex space-x-5">
                <div className="flex plan_outer space-x-2">
                  <label className="relative">
                    <input
                      type="radio"
                      name="renewalPeriod"
                      value="12"
                      className="absolute w-full h-full opacity-0 z-10"
                      onChange={(e) => {
                        handleInput(e)
                      }}
                    />
                    <div className="w-[20px] h-[20px] border-2 rounded-full border-complimentaryLight bg-complimentaryLight flex items-center justify-center rounded-full block plan_border">
                      {planDetails.renewalPeriod == '12' ? (
                        <div className="w-[8px] h-[8px] m-auto bg-secondary rounded-full"></div>
                      ) : (
                        ''
                      )}
                    </div>
                  </label>
                  <label
                    htmlFor="renewalPeriod"
                    className="text-sm text-secondary font-bold"
                  >
                    12 Months
                  </label>
                </div>
                <div className="flex plan_outer space-x-2">
                  <label className="relative">
                    <input
                      type="radio"
                      name="renewalPeriod"
                      value="24"
                      className="absolute w-full h-full opacity-0 z-10"
                      onChange={(e) => {
                        handleInput(e)
                      }}
                    />
                    <div className="w-[20px] h-[20px] border-2 rounded-full border-complimentaryLight bg-complimentaryLight flex items-center justify-center rounded-full block plan_border">
                      {planDetails.renewalPeriod == '24' ? (
                        <div className="w-[8px] h-[8px] m-auto bg-secondary rounded-full"></div>
                      ) : (
                        ''
                      )}
                    </div>
                  </label>
                  <label
                    htmlFor="renewalPeriod"
                    className="text-sm text-secondary font-bold"
                  >
                    24 Months
                  </label>
                </div>
                <div className="flex plan_outer space-x-2">
                  <label className="relative">
                    <input
                      type="radio"
                      name="renewalPeriod"
                      value="N/A"
                      className="absolute w-full h-full opacity-0 z-10"
                      onChange={(e) => {
                        handleInput(e)
                      }}
                    />
                    <div className="w-[20px] h-[20px] border-2 rounded-full border-complimentaryLight bg-complimentaryLight flex items-center justify-center rounded-full block plan_border">
                      {planDetails.renewalPeriod == 'N/A' ? (
                        <div className="w-[8px] h-[8px] m-auto bg-secondary rounded-full"></div>
                      ) : (
                        ''
                      )}
                    </div>
                  </label>
                  <label
                    htmlFor="renewalPeriod"
                    className="text-sm text-secondary font-bold"
                  >
                    N/A
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-x-[26px] mt-[20px]">
            <div className="w-full flex items-center justify-start space-x-[30px]">
              <label
                htmlFor="Go-Live"
                className="text-sm text-secondary font-bold block mb-0 text-right w-[28.3444%]"
              >
                Go-Live Date
              </label>
              <div className="w-[71%] flex space-x-5">
                <input
                  type="date"
                  name="goLiveDate"
                  id="Go-Live"
                  className="ps-5 h-[45px] outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                  onChange={(e) => {
                    handleInput(e)
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-x-[26px] mt-[20px]">
            <div className="w-full flex items-center justify-start space-x-[30px]">
              <label
                htmlFor="Rate"
                className="text-sm text-secondary font-bold block mb-0 text-right w-[28.3444%]"
              >
                Rate Per Video (USD)
              </label>
              <div className="w-[71%] flex space-x-5">
                <input
                  type="text"
                  name="ratePerVideo"
                  id="Rate"
                  className="ps-5 h-[45px] outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                  onChange={(e) => {
                    handleInput(e)
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-x-[26px] mt-[20px]">
            <div className="w-full flex items-center justify-start space-x-[30px]">
              <label
                htmlFor="video-credits-included"
                className="text-sm text-secondary font-bold block mb-0 text-right w-[28.3444%]"
              >
                # Video Credits Included
              </label>
              <div className="w-[71%] flex space-x-5 items-center">
                <input
                  type="text"
                  name="videoCreditsIncluded"
                  id="video-credits-included"
                  className="ps-5 h-[45px] outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                  onChange={(e) => {
                    handleInput(e)
                  }}
                />

                <div className="flex plan_outer space-x-2">
                  <label className="relative">
                    <input
                      type="radio"
                      name="videoCreditsIncluded"
                      value={planDetails.videoCreditsIncluded}
                      className="absolute w-full h-full opacity-0 z-10"
                      onChange={(e) => {
                        handleInput(e)
                      }}
                    />
                    <div className="w-[20px] h-[20px] border-2 rounded-full border-complimentaryLight bg-complimentaryLight flex items-center justify-center rounded-full block plan_border">
                      {planDetails.videoCreditsIncluded === '0' ? (
                        <div className="w-[8px] h-[8px] m-auto bg-secondary rounded-full"></div>
                      ) : (
                        ''
                      )}
                    </div>
                  </label>
                  <label
                    htmlFor="NA"
                    className="text-sm text-secondary font-bold"
                  >
                    NA
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-x-[26px] mt-[20px]">
            <div className="w-full flex items-center justify-start space-x-[30px]">
              <label
                htmlFor="Video
                                Credit Frequency"
                className="text-sm text-secondary font-bold block mb-0 text-right w-[28.3444%]"
              >
                Video Credit Frequency
              </label>
              <div className="w-[71%] flex space-x-5 items-center">
                <div className="flex plan_outer space-x-2">
                  <label className="relative">
                    <input
                      type="radio"
                      name="videoCreditsFrequency"
                      value="MONTHLY"
                      className="absolute w-full h-full opacity-0 z-10"
                      onChange={(e) => {
                        handleInput(e)
                      }}
                    />
                    <div className="w-[20px] h-[20px] border-2 rounded-full border-complimentaryLight bg-complimentaryLight flex items-center justify-center rounded-full block plan_border">
                      {planDetails.videoCreditsFrequency == 'MONTHLY' ? (
                        <div className="w-[8px] h-[8px] m-auto bg-secondary rounded-full"></div>
                      ) : (
                        ''
                      )}
                    </div>
                  </label>
                  <label
                    htmlFor="MONTHLY"
                    className="text-sm text-secondary font-bold"
                  >
                    Monthly
                  </label>
                </div>
                <div className="flex plan_outer space-x-2">
                  <label className="relative">
                    <input
                      type="radio"
                      name="videoCreditsFrequency"
                      value="ANNUALLY"
                      className="absolute w-full h-full opacity-0 z-10"
                      onChange={(e) => {
                        handleInput(e)
                      }}
                    />
                    <div className="w-[20px] h-[20px] border-2 rounded-full border-complimentaryLight bg-complimentaryLight flex items-center justify-center rounded-full block plan_border">
                      {planDetails.videoCreditsFrequency == 'ANNUALLY' ? (
                        <div className="w-[8px] h-[8px] m-auto bg-secondary rounded-full"></div>
                      ) : (
                        ''
                      )}
                    </div>
                  </label>
                  <label
                    htmlFor="ANNUALLY"
                    className="text-sm text-secondary font-bold"
                  >
                    Annually
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-x-[26px] mt-[20px]">
            <div className="w-full flex items-center justify-start space-x-[30px]">
              <label
                htmlFor="Payment
                                Method"
                className="text-sm text-secondary font-bold block mb-0 text-right w-[28.3444%]"
              >
                Payment Method
              </label>
              <div className="w-[71%] flex space-x-5 items-center">
                <div className="flex plan_outer space-x-2">
                  <label className="relative">
                    <input
                      type="radio"
                      name="paymentMethods"
                      value="CREDIT_CARD"
                      className="absolute w-full h-full opacity-0 z-10"
                      onChange={(e) => {
                        handleInput(e)
                      }}
                    />
                    <div className="w-[20px] h-[20px] border-2 rounded-full border-complimentaryLight bg-complimentaryLight flex items-center justify-center rounded-full block plan_border">
                      {planDetails.paymentMethods == 'CREDIT_CARD' ? (
                        <div className="w-[8px] h-[8px] m-auto bg-secondary rounded-full"></div>
                      ) : (
                        ''
                      )}
                    </div>
                  </label>
                  <label
                    htmlFor="CREDIT_CARD"
                    className="text-sm text-secondary font-bold"
                  >
                    Credit Card
                  </label>
                </div>
                <div className="flex plan_outer space-x-2">
                  <label className="relative">
                    <input
                      type="radio"
                      name="paymentMethods"
                      value="MONTHLY_INVOICE"
                      className="absolute w-full h-full opacity-0 z-10"
                      onChange={(e) => {
                        handleInput(e)
                      }}
                    />
                    <div className="w-[20px] h-[20px] border-2 rounded-full border-complimentaryLight bg-complimentaryLight flex items-center justify-center rounded-full block plan_border">
                      {planDetails.paymentMethods === 'MONTHLY_INVOICE' ? (
                        <div className="w-[8px] h-[8px] m-auto bg-secondary rounded-full"></div>
                      ) : (
                        ''
                      )}
                    </div>
                  </label>
                  <label
                    htmlFor="MONTHLY_INVOICE"
                    className="text-sm text-secondary font-bold"
                  >
                    Monthly Invoice
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-x-[26px] mt-[20px]">
            <div className="w-full flex items-center justify-start space-x-[30px]">
              <label
                htmlFor="Payment
                                Terms"
                className="text-sm text-secondary font-bold block mb-0 text-right w-[28.3444%]"
              >
                Payment Terms
              </label>
              <div className="w-[71%] flex space-x-5">
                <select
                  name="paymentTerms"
                  value={planDetails.paymentTerms}
                  className="pl-[15px] outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full pt-[10px] h-[45px] pb-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                  id="country-code"
                  onChange={(e) => {
                    handleInput(e)
                  }}
                >
                  <option value="MONTH">30 Days</option>
                  <option value="TWO_MONTH">60 Days</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-x-[26px] mt-[20px]">
            <div className="w-full flex items-center justify-start space-x-[30px]">
              <label
                htmlFor="Payment
                                Due Date"
                className="text-sm text-secondary font-bold block mb-0 text-right w-[28.3444%]"
              >
                Payment Due Date
              </label>
              <div className="w-[71%] flex space-x-5">
                <input
                  type="text"
                  name="paymentDueDate"
                  id=""
                  className="ps-5 h-[45px] outline-0 border-2 border-accentDark rounded bg-accentDark pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                  onChange={(e) => {
                    handleInput(e)
                  }}
                />
              </div>
            </div>
          </div>
          <button
            className={classNames({
              'w-auto hove_button rounded-full ml-auto mt-8 lg:py-[13.5px] lg:px-[61px] md:py-[13.5px] md:px-[61px] sm:py-[10px] sm:px-[40px] py-[10px] px-[30px] relative  flex items-center font-extrabold text-sm justify-center':
                true,
              'bg-accentDark text-secondary': isFormValid,
              'bg-secondary text-white': !isFormValid,
            })}
            disabled={isFormValid}
            onClick={() => {
              handleSubmit()
            }}
          >
            Continue
            <Image
              alt=""
              src={rightArrow}
              className="relative bottom-px left-1"
            />
          </button>
        </form>
      </div>
    </>
  )
}
export default PlanDetails
