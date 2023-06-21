import { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser
  }
  interface JWT {
    id: string
  }

  interface User {
    accountNumber: any
  }
}
