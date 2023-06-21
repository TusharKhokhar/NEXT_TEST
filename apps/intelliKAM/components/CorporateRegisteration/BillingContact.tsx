import { useDispatch, useSelector } from 'react-redux'
import Steps from './Steps'
import { corporateRegistrationStep } from '../../store/slices/corporateRegistration'
import { useState } from 'react'
import { billingContactObject } from '../../constants/constants'
import classNames from 'classnames'
import Image from 'next/image'
import rightArrow from '../../public/images/right_arrow.png'
import { RootState } from '../../store/store'
import { signIn } from 'next-auth/react'
import Loader from '../../common/loader'
import { countryJson } from '../../constants/constants'
import { option } from '../../common/utils'
import Select from 'react-select'

const BillingContact = () => {
  const dispatch = useDispatch()
  const companyInfo = useSelector(
    (state: RootState) => state.corporateRegistration.companyInfo
  )
  const adminInfo = useSelector(
    (state: RootState) => state.corporateRegistration.adminInfo
  )
  const planDetails = useSelector(
    (state: RootState) => state.corporateRegistration.planDetails
  )
  const [billingContacts, setBillingContacts] = useState(billingContactObject)
  const [isFormValid, setIsFormValid] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleInput = (e: any) => {
    setBillingContacts({ ...billingContacts, [e.target.name]: e.target.value })
    if (
      !checkValidation({ ...billingContacts, [e.target.name]: e.target.value })
    ) {
      setIsFormValid(false)
    } else {
      setIsFormValid(true)
    }
  }

  const handleCountryCode = (e: any) => {
    setBillingContacts((state) => ({ ...state, ['countryCode']: e.value }))
  }

  const checkValidation = (formData: any) => {
    if (
      formData.firstName.trim() == '' ||
      formData.lastName.trim() == '' ||
      formData.jobTitle.trim() == '' ||
      formData.email.trim() == '' ||
      formData.countryCode.trim() == '' ||
      formData.mobilePhone.trim() == '' ||
      formData.address1.trim() == '' ||
      formData.appartmentEtc.trim() == '' ||
      formData.country.trim() == '' ||
      formData.state.trim() == '' ||
      formData.city.trim() == '' ||
      formData.zipCode.trim() == ''
    ) {
      return true
    }
    return false
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const accountNumber: any = Math.floor(Math.random() * 100000000)
    let data = {
      ...companyInfo,
      ...adminInfo,
      ...planDetails,
      billing: {
        ...billingContacts,
      },
      accountNumber: accountNumber.toString(),
    }

    const response = await fetch(`/api/auth/corporateregistration`, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    const { data: signUpData, error: signUpError } = await response.json()
    if (signUpError) {
      setIsLoading(false)
      alert(signUpError)
      return
    }
    setIsLoading(false)
    signIn(
      'email',
      {
        email: signUpData.email,
        redirect: false,
        callbackUrl: `${window.location.origin}/verification`,
      },
      {
        account: accountNumber,
      }
    )
    dispatch(corporateRegistrationStep(4))
    // const createViewRes = await fetch(`/api/users/createview`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     accountNumber: signUpData.accountNumber,
    //     selectedPlan: 'Corporate',
    //     firstName: signUpData.firstName,
    //     email: signUpData.email,
    //   }),
    // })

    // const { data: createViewData, error: createViewError } =
    //   await createViewRes.json()

    // if (createViewError) {
    //   setIsLoading(false)
    //   alert(createViewError)
    //   return
    // }
    // if (!createViewError) {
    //   setIsLoading(false)
    //   signIn('email', {
    //     email: signUpData.email,
    //     redirect: false,
    //     callbackUrl: `${window.location.origin}/verification`,
    //   })
    //   dispatch(corporateRegistrationStep(4))
    // }
  }

  return (
    <>
      {isLoading && <Loader />}
      <Steps />
      <div className="w-[47.5%] m-auto">
        <h2 className="text-[28px] text-primary font-medium">
          Billing Contact
        </h2>
        <form action="" method="post" className="mt-7">
          <div className="flex space-x-7">
            <div className="w-[45.55%]">
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
                className="pl-[15px] h-[45px] outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full pt-[10px] pb-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                onChange={(e) => {
                  handleInput(e)
                }}
              />
            </div>

            <div className=" w-[45.55%]">
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
                className="ps-5 h-[45px] outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                onChange={(e) => {
                  handleInput(e)
                }}
              />
            </div>
          </div>
          <div className="flex space-x-7 mt-[30px]">
            <div className="w-[45.55%]">
              <label
                htmlFor="job-title"
                className="text-sm text-secondary font-bold w-full block mb-2"
              >
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                id="job-title"
                className="pl-[15px] h-[45px] outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full pt-[10px] pb-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                onChange={(e) => {
                  handleInput(e)
                }}
              />
            </div>

            <div className=" w-[45.55%]">
              <label
                htmlFor="email-address"
                className="text-sm text-secondary font-bold w-full block mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email-address"
                className="ps-5 h-[45px] outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                onChange={(e) => {
                  handleInput(e)
                }}
              />
            </div>
          </div>
          <div className="flex space-x-7 mt-[30px]">
            <div className="w-[45.55%]">
              <label
                htmlFor="country-code"
                className="text-sm text-secondary font-bold w-full block mb-2"
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

            <div className=" w-[45.55%]">
              <label
                htmlFor="mobile-phone"
                className="text-sm text-secondary font-bold w-full block mb-2"
              >
                Mobile Phone
              </label>
              <input
                type="tel"
                name="mobilePhone"
                id="mobile-phone"
                className="ps-5 outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                onChange={(e) => {
                  handleInput(e)
                }}
              />
            </div>
          </div>
          <div className="flex space-x-7 mt-[30px]">
            <div className="w-[45.55%]">
              <label
                htmlFor="address"
                className="text-sm text-secondary font-bold w-full block mb-2"
              >
                Address 1
              </label>

              <input
                type="text"
                name="address1"
                id="address"
                className="ps-5 outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                onChange={(e) => {
                  handleInput(e)
                }}
              />
            </div>

            <div className=" w-[45.55%]">
              <label
                htmlFor="appartment"
                className="text-sm text-secondary font-bold w-full block mb-2"
              >
                Apartment, Suite, Etc.
              </label>
              <input
                type="text"
                name="appartmentEtc"
                id="appartment"
                className="ps-5 outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                onChange={(e) => {
                  handleInput(e)
                }}
              />
            </div>
          </div>
          <div className="flex space-x-7 mt-[30px]">
            <div className="w-[45.55%]">
              <label
                htmlFor="country"
                className="text-sm text-secondary font-bold w-full block mb-2"
              >
                Country/Region
              </label>

              <input
                type="text"
                name="country"
                id="country"
                className="ps-5 outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                onChange={(e) => {
                  handleInput(e)
                }}
              />
            </div>

            <div className=" w-[45.55%]">
              <label
                htmlFor="state"
                className="text-sm text-secondary font-bold w-full block mb-2"
              >
                State/Province
              </label>
              <input
                type="text"
                name="state"
                id="state"
                className="ps-5 outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                onChange={(e) => {
                  handleInput(e)
                }}
              />
            </div>
          </div>
          <div className="flex space-x-7 mt-[30px]">
            <div className="w-[45.55%]">
              <label
                htmlFor="city"
                className="text-sm text-secondary font-bold w-full block mb-2"
              >
                City
              </label>

              <input
                type="text"
                name="city"
                id="city"
                className="ps-5 outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                onChange={(e) => {
                  handleInput(e)
                }}
              />
            </div>

            <div className=" w-[45.55%]">
              <label
                htmlFor="zipCode"
                className="text-sm text-secondary font-bold w-full block mb-2"
              >
                Postal/Zipcode
              </label>
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                className="ps-5 outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                onChange={(e) => {
                  handleInput(e)
                }}
              />
            </div>
          </div>
          <button
            type="button"
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
            Activate Account
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
export default BillingContact
