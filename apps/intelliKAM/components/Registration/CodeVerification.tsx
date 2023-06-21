import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import greaterThen from '../../public/images/greaterThen.svg'
import Image from 'next/image'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import Loader from '../../common/loader'

const CodeVerification = () => {
  const router = useRouter()
  const digit1Ref = useRef<HTMLInputElement>(null)
  const digit2Ref = useRef<HTMLInputElement>(null)
  const digit3Ref = useRef<HTMLInputElement>(null)
  const digit4Ref = useRef<HTMLInputElement>(null)

  const [otpData, setOtpData] = useState({
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
    otp: '',
  })
  const { data: session, status }: any = useSession()
  const { digit1, digit2, digit3, digit4 } = otpData
  const [isLoading, setIsLoading] = useState(false)

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setOtpData((otp) => ({ ...otp, [e.target.name]: e.target.value }))
  }
  const onKeyDown = (e: any) => {
    if (e.keyCode === 8) {
      if (digit4.length == 0) {
        digit3Ref.current?.focus()
      }

      if (digit3.length == 0) {
        digit2Ref.current?.focus()
      }

      if (digit2.length == 0) {
        digit1Ref.current?.focus()
      }
    }
  }

  useEffect(() => {
    setOtpData((otpData) => {
      let newOtpData =
        otpData.digit1 + otpData.digit2 + otpData.digit3 + otpData.digit4

      let newOtp: number = parseInt(newOtpData)
      if (isNaN(newOtp) || newOtp < 0) {
        newOtp = 0
      }
      return {
        ...otpData,
        otp: newOtp.toString(),
      }
    })

    if (digit1Ref.current && digit1.length > 0) {
      digit2Ref.current?.focus()
    }

    if (digit2Ref.current && digit2.length > 0) {
      digit3Ref.current?.focus()
    }

    if (digit3Ref.current && digit3.length > 0) {
      digit4Ref.current?.focus()
    }
  }, [digit1, digit2, digit3, digit4])

  useEffect(() => {
    const handlePaste = (e: any) => {
      const _text = e.clipboardData.getData('text/plain')
      if (_text && _text.trim() && _text.trim().length === 4) {
        setOtpData((formData) => ({
          ...formData,
          digit1: _text.trim().substring(0, 1),
          digit2: _text.trim().substring(1, 2),
          digit3: _text.trim().substring(2, 3),
          digit4: _text.trim().substring(3, 4),
        }))
        return
      }
    }
    window.addEventListener('paste', handlePaste)
    return () => {
      window.removeEventListener('paste', handlePaste)
    }
  }, [])

  const handleSubmit = async () => {
    setIsLoading(true)
    // const response = await fetch(
    //   `api/users/getuser?email=${session.user.email}&accountNumber=${session.user.account}`,
    //   {
    //     method: 'GET',
    //   }
    // )

    // const { data: user, error: userError } = await response.json()
    // const verifyPhoneNumber = async () => {
      const phoneVerified = await fetch(`api/verification/verifyphone`, {
        method: 'PUT',
        body: JSON.stringify({
          id: session.user.id,
          accountNumber: session.user.account,
          verificationCode : otpData.otp
        }),
      })
      const { data: verified, error: verifyError } = await phoneVerified.json()
      if (verifyError) {
        setIsLoading(false)
        alert(verifyError)
        return
      }
      setIsLoading(false)
      router.push('/verified')
    // }
    // if (userError) {
    //   setIsLoading(false)
    //   alert(userError)
    //   return
    // } else {
      // if (
      //   user.verificationCode.toString() === otpData.otp ||
      //   parseInt(otpData.otp) === 2860
      // ) {
      //   verifyPhoneNumber()
      // } else {
      //   setIsLoading(false)
      //   alert('Verification code is not matched')
      // }
    // }
  }

  const isFormValid = otpData.otp.length == 4 ? false : true

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
                  <h5 className="text-lg font-extrabold text-primary leading-[26px] tracking-[0px]">
                    Enter the 4 digit verification code that was sent to
                    123-456-7890:
                  </h5>
                  <div className="mt-[0px]">
                    <form action="" method="post" className="mt-[19px]">
                      <div className="flex space-x-[10px]">
                        <div className="w-[57px]">
                          <input
                            type="text"
                            id="digit1"
                            name="digit1"
                            value={digit1}
                            ref={digit1Ref}
                            maxLength={1}
                            className="outline-0 border-2 rounded bg-complimentaryLight w-full h-[60px] p-[15px] text-center text-[28px] text-secondary font-bold placeholder:text-secondary hover:border-secondary focus:border-secondary visited:border-secondary"
                            onChange={(e) => {
                              handleInput(e)
                            }}
                            onKeyDown={(e) => {
                              onKeyDown(e)
                            }}
                          />
                        </div>
                        <div className="w-[57px]">
                          <input
                            type="text"
                            id="digit2"
                            name="digit2"
                            value={digit2}
                            ref={digit2Ref}
                            maxLength={1}
                            className="outline-0 border-2 rounded bg-complimentaryLight w-full h-[60px] p-[15px] text-center text-[28px] text-secondary font-bold placeholder:text-secondary hover:border-secondary focus:border-secondary visited:border-secondary"
                            onChange={(e) => {
                              handleInput(e)
                            }}
                            onKeyDown={(e) => {
                              onKeyDown(e)
                            }}
                          />
                        </div>
                        <div className="w-[57px]">
                          <input
                            type="text"
                            id="digit3"
                            name="digit3"
                            value={digit3}
                            ref={digit3Ref}
                            maxLength={1}
                            className="outline-0 border-2 rounded bg-complimentaryLight w-full h-[60px] p-[15px] text-center text-[28px] text-secondary font-bold placeholder:text-secondary hover:border-secondary focus:border-secondary visited:border-secondary"
                            onChange={(e) => {
                              handleInput(e)
                            }}
                            onKeyDown={(e) => {
                              onKeyDown(e)
                            }}
                          />
                        </div>
                        <div className="w-[57px]">
                          <input
                            type="text"
                            id="digit4"
                            name="digit4"
                            value={digit4}
                            ref={digit4Ref}
                            maxLength={1}
                            className="outline-0 border-2 rounded bg-complimentaryLight w-full h-[60px] p-[15px] text-center text-[28px] text-secondary font-bold placeholder:text-secondary hover:border-secondary focus:border-secondary visited:border-secondary"
                            onChange={(e) => {
                              handleInput(e)
                            }}
                            onKeyDown={(e) => {
                              onKeyDown(e)
                            }}
                          />
                        </div>
                      </div>
                    </form>
                    <a
                      href="javascript:void"
                      className="no-underline inline-block mt-[20px] leading-[18px] text-sm text-secondary border-b border-secondary"
                    >
                      Resend Verification Code
                    </a>
                  </div>
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
              Submit
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
export default CodeVerification
