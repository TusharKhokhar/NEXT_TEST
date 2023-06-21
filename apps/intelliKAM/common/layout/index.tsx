import React from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import PlanSidebar from '../../components/PlanSideBar'
import { useRouter } from 'next/router'

const Layout = ({ children }: any) => {
  const { pathname } = useRouter()
  return (
    <>
      {pathname === '/' ||
      pathname === '/verified' ||
      pathname === '/verification' ? (
        ''
      ) : (
        <Header />
      )}
      <section className="bg-white">
        <div className="container-fluide m-auto">
          <div className="flex">
            {pathname === '/' || pathname === '/verification' ? (
              <PlanSidebar />
            ) : (
              <Sidebar />
            )}
            <div className="w-full mt-[67px]">{children}</div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Layout
