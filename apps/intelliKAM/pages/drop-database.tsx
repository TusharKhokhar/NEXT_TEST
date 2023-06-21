import classNames from 'classnames'
import { ChangeEvent, useState } from 'react'

export default function DropDatabase() {
  const [database, setDatabase] = useState('')
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setDatabase(e.target.value)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (database.trim() !== '') {
      const response = await fetch('api/users/deleteview', {
        method: 'POST',
        body: JSON.stringify({ database: database }),
      })
      const { data, error } = await response.json()
      if (error) {
        alert(error)
        return
      } else {
        alert(data)
      }
    }
  }

  const isFormValid = database !== '' ? false : true
  return (
    <div className="w-[92.2%] ml-auto pt-24 inner_container">
      <form action="" method="post" className="mt-[19px]">
        <div className="w-[48%]">
          <label
            htmlFor="drop"
            className="text-sm text-secondary font-bold w-full block mb-2"
          >
            Database Name
          </label>
          <input
            type="text"
            name="drop"
            id="drop"
            className="ps-5 outline-0 border-2 border-complimentaryLight rounded bg-complimentaryLight pe-5 w-full py-[10.5px] text-sm text-secondary font-bold placeholder:text-secondary"
            onChange={(e) => {
              handleInput(e)
            }}
          />
          <button
            type="submit"
            className={classNames({
                'w-auto hove_button rounded-full ml-auto mt-8 lg:py-[13.5px] lg:px-[61px] md:py-[13.5px] md:px-[61px] sm:py-[10px] sm:px-[40px] py-[10px] px-[30px] relative  flex items-center font-extrabold text-sm justify-center':
                  true,
                'bg-accentDark text-secondary': isFormValid,
                'bg-secondary text-white': !isFormValid,
              })}
              disabled={isFormValid}
            onClick={(e) => {
              handleSubmit(e)
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
