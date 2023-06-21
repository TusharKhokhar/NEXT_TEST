import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export const AuthGurd: any = ({ children }: any) => {
  const { data: session, status }: any = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      if (router.pathname === '/') {
        router.push('/')
      } else {
        router.push('/login')
      }
    }
  }, [session, status])

  return children
}
