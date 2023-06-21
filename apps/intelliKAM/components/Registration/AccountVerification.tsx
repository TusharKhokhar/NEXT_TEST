import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sendCode } from '../../store/slices/registrationSteps'
import greaterThen from '../../public/images/greaterThen.svg'
import Image from 'next/image'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import Loader from '../../common/loader'
import Select from 'react-select'
import { countryJson } from '../../constants/constants'
import { option } from '../../common/utils'

const AccountVerification = () => {
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    countryCode: '+1',
    phoneNumber: '',
  })
  const { data: session, status }: any = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleSendCode = async () => {
    setIsLoading(true)
    if (form.countryCode && form.phoneNumber) {
      const min = 1000 // Minimum 4-digit number (inclusive)
      const max = 9999 // Maximum 4-digit number (inclusive)

      const code = Math.floor(Math.random() * (max - min + 1)) + min
      const response = await fetch('api/verification/verificationcode', {
        method: 'PUT',
        body: JSON.stringify({
          id: session.user.id,
          phoneNumber: form.countryCode + form.phoneNumber,
          accountNumber: session.user.account,
          verificationCode: code,
        }),
      })
      const { data, error } = await response.json()
      if (error) {
        setIsLoading(false)
        alert(error)
        return
      } else {
        const vonage = await fetch('api/verification/vonagesms', {
          method: 'POST',
          body: JSON.stringify({
            phoneNumber: data.phoneNumber.slice(1),
            verificationCode: data.verificationCode,
          }),
        })
        const { data: message, error: smsError } = await vonage.json()
        if (smsError) {
          setIsLoading(false)
          alert(smsError)
          return
        }
        setIsLoading(false)
        dispatch(sendCode(true))
      }
    }
  }

  const handleInput = (e: any) => {
    setForm((state) => ({ ...state, [e.target.name]: e.target.value }))
  }

  const handleCountryCode = (e: any) => {
    setForm((state) => ({ ...state, ['countryCode']: e.value }))
  }

  const isFormValid =
    form.countryCode !== '' && form.phoneNumber !== '' ? false : true
  return (
    <>
      {isLoading && <Loader />}
      <div className="w-[76.28%] inner_container lg:ml-[360px] md:ml-[300px] sm:ml-[300px] ml-auto mr-auto">
        <div
          className="lg:pt-[46px] lg:pb-0 lg:pr-[100px] lg:pl-[100px] md:pt-[46px] md:pb-0 md:pr-[40px] md:pl-[40px] sm:pt-[40px] 
      sm:px-[30px] px-[20px] pt-[20px] max-w-[944px] md:ml-0 xl:ml-0 2xl:m-auto"
        >
          <div className="mb-[42px]">
            <h1 className="text-5xl md:text-5xl sm:text-[30px] text-[30px] text-primary font-extrabold">
              Account Verification
            </h1>
          </div>
          <div className="lg:w-[600px] md:w-[600px] sm:w-full w-full">
            <div className="lg:pt-[25px] lg:px-[31px] lg:pb-[35px] md:pt-[25px] md:px-[31px] md:pb-[35px] sm:p-[20px] p-[15px] bg-white border-4 border-complimentary rounded-xl">
              <div className="flex items-start">
                <div className="pl-0 lg:pr-[130px] md:pr-[130px]">
                  <h5 className="text-lg font-extrabold text-primary leading-[25px] tracking-[-0.1px]">
                    Thanks for confirming your email! Please enter your phone
                    number below so we can send you a one-time verification
                    code:
                  </h5>
                  <div className="mt-[20px]">
                    <form action="" className="mt-5">
                      <div className="flex space-x-5">
                        <div className="lg:w-[34.424%] md:w-[25.424%] sm:w-[32.424%] w-[30.424%]">
                          <label
                            htmlFor="country-code"
                            className="lg:text-sm md:text-sm sm:text-sm text-[12px] text-secondary font-bold w-full block mb-[7px]"
                          >
                            Country Code
                          </label>
                          <Select
                            className=" tracking-[4.5px] outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight w-full py-10.5 text-sm text-secondary font-bold placeholder:text-secondary h-[45px]"
                            options={countryJson}
                            getOptionValue={(option: { value: any }) =>
                              option.value
                            }
                            getOptionLabel={(option: { value: any }) =>
                              option.value
                            }
                            components={{ Option: option }}
                            onChange={handleCountryCode}
                          />
                        </div>
                        <div className="w-[44.766%]">
                          <label
                            htmlFor="phone-number"
                            className="lg:text-sm md:text-sm sm:text-sm text-[12px] text-secondary font-bold w-full block mb-[7px]"
                          >
                            Phone Number
                          </label>
                          <input
                            type="text"
                            name="phoneNumber"
                            id="phone-number"
                            className="ps-[15px] outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[11.4px] text-sm text-secondary font-bold placeholder:text-secondary"
                            onChange={(e) => {
                              handleInput(e)
                            }}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
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
              onClick={() => {
                handleSendCode()
              }}
            >
              Send Code
              <Image
                src={greaterThen}
                className="relative bottom-px left-1"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default AccountVerification
