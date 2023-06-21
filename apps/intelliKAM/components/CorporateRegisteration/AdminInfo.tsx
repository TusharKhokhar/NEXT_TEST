import { useDispatch } from 'react-redux'
import Steps from './Steps'
import {
  adminInformation,
  corporateRegistrationStep,
} from '../../store/slices/corporateRegistration'
import { adminInfoObject } from '../../constants/constants'
import { useState } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import rightArrow from '../../public/images/right_arrow.png'
import { countryJson } from '../../constants/constants'
import { option } from '../../common/utils'
import Select from 'react-select'
import { useSession } from 'next-auth/react'

const AdminInfo = () => {
  const dispatch = useDispatch()
  const [adminInfo, setAdminInfo] = useState(adminInfoObject)
  const [isFormValid, setIsFormValid] = useState(true)
  const [emails, setEmails] = useState([])
  const { data: session, status }: any = useSession()
  const handleInput = (e: any) => {
    setAdminInfo({ ...adminInfo, [e.target.name]: e.target.value })
    if (!checkValidation({ ...adminInfo, [e.target.name]: e.target.value })) {
      setIsFormValid(false)
    } else {
      setIsFormValid(true)
    }
    if (e.target.name !== 'email') {
      setEmails([])
    }
  }

  const handleCountryCode = (e: any) => {
    setAdminInfo((state) => ({ ...state, ['countryCode']: e.value }))
  }

  const checkValidation = (formData: any) => {
    if (
      formData.firstName.trim() == '' ||
      formData.lastName.trim() == '' ||
      formData.jobTitle.trim() == '' ||
      formData.email.trim() == '' ||
      formData.countryCode.trim() == '' ||
      formData.mobilePhone.trim() == ''
    ) {
      return true
    }
    return false
  }

  const filteredEmail = async (e: any) => {
    if (e.target.value != '') {
      const response = await fetch(
        `/api/auth/filteredemail?email=${e.target.value}&accountNumber=${session.user.account}&id=${session.user.id}`,
        {
          method: 'GET',
        }
      )
      const { data, error } = await response.json()
      if (error) {
        setEmails([])
        return
      }
      setEmails(data)
    } else {
      setEmails([])
    }
  }

  const handleEmailSuggestions = (e: any) => {
    setAdminInfo({ ...adminInfo, ['email']: e.target.value })
    setEmails([])
  }

  const handleSubmit = () => {
    dispatch(adminInformation(adminInfo))
    dispatch(corporateRegistrationStep(2))
  }
  return (
    <>
      <Steps />
      <div className="w-[47.5%] m-auto">
        <h2 className="text-[28px] text-primary font-medium">
          Administrator Information
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

            <div className=" w-[45.55%] relative">
              <label
                htmlFor="email"
                className="text-sm text-secondary font-bold w-full block mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={adminInfo.email}
                className="ps-5 h-[45px] outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
                onChange={(e) => {
                  handleInput(e)
                  filteredEmail(e)
                }}
              />
              {emails.length > 0 && (
                <div className="max-h-[150px] absolute top-[100%] min-h-[45px] z-10 bg-white w-full rounded p-[10px] shadow-lg shadow-primary/10 overflow-auto">
                  {emails.map((x: any, i: number) => {
                    return (
                      <div key={i}>
                        <button
                          type="button"
                          value={x.email}
                          onClick={(e) => handleEmailSuggestions(e)}
                        >
                          {x.email}
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
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

          <button
            className={classNames({
              'w-auto hove_button rounded-full ml-auto mt-8 lg:py-[13.5px] lg:px-[61px] md:py-[13.5px] md:px-[61px] sm:py-[10px] sm:px-[40px] py-[10px] px-[30px] relative  flex items-center font-extrabold text-sm justify-center':
                true,
              'bg-accentDark text-secondary': isFormValid,
              'bg-secondary text-white': !isFormValid,
            })}
            disabled={isFormValid}
            onClick={() => handleSubmit()}
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
export default AdminInfo
