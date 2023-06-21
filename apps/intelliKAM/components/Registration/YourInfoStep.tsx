import Image from 'next/image'
import rightArrow from '../../public/images/right_arrow.png'
import { useDispatch, useSelector } from 'react-redux'
import { updateRegistrationStep } from '../../store/slices/registrationSteps'
import { useState } from 'react'
import { RootState } from '../../store/store'
import classNames from 'classnames'
import { signIn } from 'next-auth/react'
import Loader from '../../common/loader'
import Select from 'react-select'
import { countryJson } from '../../constants/constants'
import { option } from '../../common/utils'

export default function YourInfoStep() {
  const dispatch = useDispatch()
  const selectedPlan = useSelector(
    (state: RootState) => state.registrationSteps.selectedPlan
  )
  const [yourInfoForm, setYourInfoForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    countryCode: '',
    phoneNumber: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isFormValid, setIsFormValid] = useState(true)

  const handleFormInput = (e: any) => {
    setYourInfoForm({ ...yourInfoForm, [e.target.name]: e.target.value })
    if (
      !checkValidation({ ...yourInfoForm, [e.target.name]: e.target.value })
    ) {
      setIsFormValid(false)
    } else {
      setIsFormValid(true)
    }
  }

  const checkValidation = (formData: any) => {
    if (selectedPlan !== 'Corporate') {
      if (
        formData.firstName.trim() == '' ||
        formData.lastName.trim() == '' ||
        formData.email.trim() == '' ||
        formData.confirmEmail.trim() == '' ||
        formData.email !== formData.confirmEmail
      ) {
        return true
      }
    } else {
      if (
        formData.firstName.trim() == '' ||
        formData.lastName.trim() == '' ||
        formData.email.trim() == '' ||
        formData.confirmEmail.trim() == '' ||
        formData.countryCode.trim() == '' ||
        formData.phoneNumber.trim() == '' ||
        formData.email !== formData.confirmEmail
      ) {
        return true
      }
    }
    return false
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    const accountNumber: any = Math.floor(Math.random() * 100000000)
    const response = await fetch(`/api/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({
        ...yourInfoForm,
        accountNumber: accountNumber.toString(),
        selectedPlan: selectedPlan,
      }),
    })
    const { data: signUpData, error: signUpError } = await response.json()
    if (signUpError) {
      alert(signUpError)
      setIsLoading(false)
      return
    }
    setIsLoading(false)
    if (selectedPlan === 'Starter') {
      signIn(
        'email',
        {
          email: yourInfoForm.email,
          redirect: false,
          callbackUrl: `${window.location.origin}/verification`,
        },
        {
          account: accountNumber,
        }
      )
    }
    setYourInfoForm({
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      countryCode: '',
      phoneNumber: '',
    })
    dispatch(updateRegistrationStep(2))
  }

  const handleCountryCode = (e: any) => {
    setYourInfoForm((state) => ({ ...state, ['countryCode']: e.value }))
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="w-[76.28%] inner_container lg:ml-[360px] md:ml-[300px] sm:ml-[300px] ml-auto mr-auto">
        <div
          className="lg:pt-[46px] lg:pb-0 lg:pr-[100px] lg:pl-[100px] md:pt-[46px] md:pb-0 md:pr-[40px] md:pl-[40px] sm:pt-[40px] 
      sm:px-[30px] px-[20px] pt-[20px] max-w-[944px] md:ml-0 xl:ml-0 2xl:m-auto"
        >
          <div className="mb-[42px] lg:w-[600px] md:w-[600px] sm:w-full w-full md:ml-0 xl:ml-0 2xl:m-auto">
            <h1 className="lg:text-5xl md:text-5xl sm:text-[30px] text-[30px] text-primary font-extrabold">
              Tell us About Yourself
            </h1>
          </div>

          <div className="lg:w-[600px] md:w-[600px] sm:w-full w-full md:ml-0 xl:ml-0 2xl:m-auto">
            <form action="" className="mt-7" onSubmit={handleSubmit}>
              <div className="flex space-x-7 mt-5">
                <div className="w-[48%]">
                  <label
                    htmlFor="first-name"
                    className="text-sm text-secondary font-bold w-full block mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="first-name"
                    className="ps-5 outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                    onChange={(e) => {
                      handleFormInput(e)
                    }}
                  />
                </div>

                <div className=" w-[48%]">
                  <label
                    htmlFor="last-name"
                    className="text-sm text-secondary font-bold w-full block mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="last-name"
                    className="ps-5 outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                    onChange={(e) => {
                      handleFormInput(e)
                    }}
                  />
                </div>
              </div>
              <div className="flex space-x-7 mt-5">
                <div className="w-[48%]">
                  <label
                    htmlFor="email-address"
                    className="text-sm text-secondary font-bold w-full block mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email-address"
                    className="ps-5 outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                    onChange={(e) => {
                      handleFormInput(e)
                    }}
                  />
                </div>

                <div className="w-[48%]">
                  <label
                    htmlFor="confirm-email"
                    className="text-sm text-secondary font-bold w-full block mb-2"
                  >
                    Confirm Email Address
                  </label>
                  <input
                    type="text"
                    name="confirmEmail"
                    id="confirm-email"
                    className="ps-5 outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                    onChange={(e) => {
                      handleFormInput(e)
                    }}
                  />
                </div>
              </div>

              {selectedPlan === 'Corporate' ? (
                <div className="flex space-x-7 mt-5">
                  <div className="w-[48%]">
                    <label
                      htmlFor="country-code"
                      className="text-sm text-secondary font-bold w-full block mb-[7px]"
                    >
                      Country Code
                    </label>
                    <Select
                      className=" tracking-[4.5px] outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight w-full py-10.5 text-sm text-secondary font-bold placeholder:text-secondary h-[45px]"
                      options={countryJson}
                      getOptionValue={(option: { value: any }) => option.value}
                      getOptionLabel={(option: { value: any }) => option.value}
                      components={{ Option: option }}
                      onChange={handleCountryCode}
                    />
                  </div>

                  <div className=" w-[48%]">
                    <label
                      htmlFor="phone-number"
                      className="text-sm text-secondary font-bold w-full block mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      id="phone-number"
                      className="ps-5 outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                      onChange={(e) => {
                        handleFormInput(e)
                      }}
                    />
                  </div>
                </div>
              ) : (
                ''
              )}

              <div className="mt-[30px] flex items-center flex-col justify-end">
                <span className="text-accentDarker text-sm font-bold block w-full text-right">
                  Already registered but haven’t received a confirmation
                  email?&nbsp;&nbsp;&nbsp;
                  <a
                    href="#"
                    className="no-underline text-secondary border-b border-secondary"
                  >
                    Resend Confirmation
                  </a>
                </span>
                <span className="text-accentDarker text-sm font-bold block w-full text-right mt-1">
                  Problems logging in? &nbsp;&nbsp;&nbsp;
                  <a
                    href="#"
                    className="no-underline text-secondary border-b border-secondary"
                  >
                    Reset Password
                  </a>
                </span>
              </div>

              <button
                type="submit"
                className={classNames({
                  'w-auto hove_button rounded-full ml-auto mt-8 lg:py-[13.5px] lg:px-[61px] md:py-[13.5px] md:px-[61px] sm:py-[10px] sm:px-[40px] py-[10px] px-[30px] relative  flex items-center font-extrabold text-sm justify-center':
                    true,
                  'bg-accentDark text-secondary': isFormValid,
                  'bg-secondary text-white': !isFormValid,
                })}
                disabled={isFormValid}
              >
                Submit
                <Image
                  alt=""
                  src={rightArrow}
                  className="relative bottom-px left-1"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
