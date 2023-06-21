export type Modify<T, R> = Omit<T, keyof R> & R

export type NextPage<P = {}> = React.FC<P> & {
  requireAuth?: boolean
  requireAdmin?: boolean
}

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id?: number
      role?: string
    }
  }
}
