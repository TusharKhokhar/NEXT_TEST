import Image from 'next/image'
import leftArrow from '../../public/images/left_arrow.svg'

const Done = () => {
  return (
    <>
      <div className="w-[94.2%] ml-auto pt-[60px] pb-10 inner_container">
        <div className="w-[600px] m-auto pt-[80px]">
          <div className="pt-[31px] px-[31px] pb-[34px] bg-white border-4 border-complimentary rounded-xl">
            <div className="flex items-start">
              <div className="pl-0">
                <div className="flex space-x-2">
                  <img
                    src="assest/images/account_check.svg"
                    className="mt-[-3px]"
                    alt=""
                  />
                  <h2 className="text-[28px] font-medium text-primary mb-0">
                    Account Activated!
                  </h2>
                </div>
                <h5 className="text-lg font-normal text-primary mt-[13px] mb-[11px]">
                  Welcome emails have been sent to the following administrators:
                </h5>
                <h5 className="flex items-center text-lg font-extrabold text-primary">
                  <span className="w-[9px] h-[9px] mr-[10px] ml-[10px] bg-primary inline-block rounded-full"></span>
                  Company Admin (companyadmin@email.com)
                </h5>
              </div>
            </div>
          </div>
          <span className="text-accentDarker text-sm font-bold w-full block text-right my-[40px] tracking-[-0.21px]">
            <a
              href="javascript:void"
              className="no-underline border-b border-accentDarker text-primary"
            >
              Resend Confirmations to Admins
            </a>
          </span>

          <button className="w-auto h-[49px] hove_button bg-primary rounded-full py-[15px] m-auto px-[20px] relative flex items-center font-extrabold text-sm text-white justify-center hover:bg-secondary hover:text-white">
            <Image alt="" src={leftArrow} className="relative bottom-px " />
            <span className="ml-2"> Back to Customers</span>
          </button>
        </div>
      </div>
    </>
  )
}
export default Done
