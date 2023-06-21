import Image from 'next/image'
import accountCheck from '../../public/images/account_check.svg'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

export default function DoneStep() {
  const selectedPlan = useSelector(
    (state: RootState) => state.registrationSteps.selectedPlan
  )
  return (
    <div className="w-[76.28%] inner_container lg:ml-[360px] md:ml-[300px] sm:ml-[300px] ml-auto mr-auto">
      <div
        className="lg:pt-[60px] lg:pb-0 lg:pr-[197] lg:pl-[100px] md:pt-[46px] md:pb-0 md:pr-[40px] md:pl-[40px] sm:pt-[40px] 
      sm:px-[30px] px-[20px] pt-[20px]"
      >
        {selectedPlan !== 'Corporate' ? (
          <div className="lg:w-[600px] md:w-[600px] sm:w-full w-full md:ml-0 xl:ml-0 2xl:m-auto">
            <div className="lg:py-[32px] lg:px-[32px] md:py-[32px] md:px-[32px] sm:py-[20px] px-[15px] sm:px-[20px] py-[15px] bg-white border-4 border-complimentary rounded-xl">
              <div className="flex items-start">
                <div className="pl-0">
                  <div className="flex space-x-2">
                    <Image src={accountCheck} className="mt-[-3px]" alt="" />
                    <h2 className="lg:text-[28px] md:text-[28px] sm:text-[22px] text-[22px] leading-[46px] font-medium text-primary mb-0">
                      Account Created!
                    </h2>
                  </div>
                  <h5 className="lg:text-lg md:text-lg sm:text-sm text-sm font-normal text-primary mt-[15px] mb-[11px]">
                    Check your inbox for a welcome email from us.
                  </h5>
                  <h5 className="lg:text-lg md:text-lg sm:text-sm text-sm font-extrabold text-primary">
                    Click the link in the email to activate your LeadTailor
                    account.
                  </h5>
                </div>
              </div>
            </div>
            <span className="text-accentDarker text-sm font-bold w-full block text-right mt-[40px] tracking-[-0.21px]">
              Haven’t received a confirmation email?&nbsp;&nbsp;&nbsp;
              <a
                href="#"
                className="no-underline border-b border-accentDarker text-primary"
              >
                Resend Confirmation
              </a>
            </span>
          </div>
        ) : (
          <div className="lg:w-[600px] md:w-[600px] sm:w-full w-full md:ml-0 xl:ml-0 2xl:m-auto">
            <div className="g:py-[32px] lg:px-[32px] md:py-[32px] md:px-[32px] sm:py-[20px] px-[15px] sm:px-[20px] py-[15px] bg-white border-4 border-complimentary rounded-xl">
              <div className="flex items-start">
                <div className="pl-0">
                  <div className="flex space-x-2">
                    <Image src={accountCheck} className="mt-[-3px]" alt="" />
                    <h2 className="lg:text-[28px] md:text-[28px] sm:text-[22px] text-[22px] leading-[46px]s ont-medium text-primary mb-0">
                      Thanks for your interest in our Corporate Plan!
                    </h2>
                  </div>
                  <h5 className="lg:text-lg md:text-lg sm:text-sm text-sm font-normal text-primary mt-[15px] mb-[11px] lg:mx-[55px] md:mx-[55px] sm:ml-[45px] sm:mr-0 ml-[31px]">
                    One of your Leadtailer experts will contact you <br />
                    within 48 hours.
                  </h5>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
