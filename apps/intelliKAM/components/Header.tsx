import React from 'react'
import Image from 'next/image'
import iconImage from '../public/images/Icon.svg'
import userImage from '../public/images/user.png'
import { signOut } from 'next-auth/react'

const Header = () => {
  return (
    <header className="site-header bg-white fixed w-full z-40">
      <div className="container-fluide  m-auto">
        <div className=" py-[11.511px] w-full lg:px-5 px-2 bg-complimentaryLight">
          <nav className="flex justify-between">
            <div className="flex items-center">
              <Image
                src={iconImage}
                alt=""
                className="top-px relative"
                height="24"
                width="24"
              />
              <img
                src="/images/logo.svg"
                alt=""
                className="w-12/12 ms-5 bottom-0.5 relative"
              />
            </div>
            <ul className="lg:flex hidden justify-end text-sm text-primary font-bold font-body space-x-5 items-center">
              <li>
                <div className="flex items-center top-0.5 relative">
                  <Image src={userImage} alt="" />
                  <a href="#" className="ms-1 top-0 relative">
                    LT Admin
                  </a>
                </div>
              </li>
              <li>
                <img
                  src="/images/arrow-right-on-rectangle.png"
                  alt=""
                  className="my-[10px] cursor-pointer"
                  onClick={() =>
                    signOut({
                      callbackUrl: `${window.location.origin}/login`,
                    })
                  }
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
