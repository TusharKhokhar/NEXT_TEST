import Image from 'next/image'
import rightArrow from '../../public/images/right_arrow.png'
import Steps from './Steps'
import { useDispatch } from 'react-redux'
import {
  companyInformation,
  corporateRegistrationStep,
} from '../../store/slices/corporateRegistration'
import { useState } from 'react'
import { companyInfoObject } from '../../constants/constants'
import classNames from 'classnames'

const ComponyInfo = () => {
  const dispatch = useDispatch()
  const [companyInfo, setCompanyInfo] = useState(companyInfoObject)
  const [isFormValid, setIsFormValid] = useState(true)

  const handleInput = (e: any) => {
    setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value })
    if (!checkValidation({ ...companyInfo, [e.target.name]: e.target.value })) {
      setIsFormValid(false)
    } else {
      setIsFormValid(true)
    }
  }

  const checkValidation = (formData: any) => {
    if (
      formData.companyName.trim() == '' ||
      formData.companyWebsite.trim() == ''
    ) {
      return true
    }
    return false
  }

  const handleSubmit = () => {
    dispatch(companyInformation(companyInfo))
    dispatch(corporateRegistrationStep(1))
  }

  return (
    <>
      <Steps />
      <div className="w-[47.5%] m-auto">
        <h2 className="text-[28px] text-primary font-medium">
          Company Information
        </h2>

        <form action="" method="post" className="mt-7">
          <div className="flex space-x-7">
            <div className="w-[45.55%]">
              <label
                htmlFor="company-name"
                className="text-sm text-secondary font-bold w-full block mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                id="company-name"
                className="ps-5 outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                onChange={(e) => {
                  handleInput(e)
                }}
              />
            </div>

            <div className=" w-[45.55%]">
              <label
                htmlFor="company-website"
                className="text-sm text-secondary font-bold w-full block mb-2"
              >
                Company Website
              </label>
              <input
                type="text"
                name="companyWebsite"
                id="company-website"
                className="ps-5 outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                onChange={(e) => {
                  handleInput(e)
                }}
              />
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
export default ComponyInfo
