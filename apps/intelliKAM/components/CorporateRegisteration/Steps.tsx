import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const Steps = () => {
 
  const step = useSelector(
    (state: RootState) => state.corporateRegistration.step
  )
  
  return (
    <>
      <div className="mb-[41px] pb-5 flex justify-center pe-[31px]">
        <ul className="inline-flex justify-center items-center relative after:content-[' '] after:absolute after:w-full after:h-1 after:border-1 after:bg-complimentaryLight">
          {step !== 0 ? (
            <li
              className={classNames({
                'absolute block h-[3.99px] left-1 bg-complimentary border-2 border-complimentary z-10':
                  true,
                'w-[150px]': step === 1,
                'w-[300px]': step === 2,
                'w-[450px]': step === 3,
              })}
            ></li>
          ) : (
            ''
          )}
          {[1, 2, 3, 4].map((x, i) => {
            return (
              <>
                <li
                  key={i}
                  className={classNames({
                    'z-10 rounded-full w-10 h-10 flex items-center justify-center text-sm text-primary font-bold bg-complimentaryLight':
                      true,
                    'ms-[102px]': i !== 0,
                    'border-2 border-complimentary bg-white': i <= step,
                  })}
                >
                  {i + 1}
                </li>
              </>
            )
          })}
        </ul>
      </div>
    </>
  )
}
export default Steps
