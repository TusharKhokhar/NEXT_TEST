import prisma from 'db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import './types'
import EmailProvider from 'next-auth/providers/email'

const emailConfig = {
  server: {
    host: process.env.EMAIL_SERVER_HOST,
    port: 465,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    logger: true,
    debug: false,
  },
  from: process.env.EMAIL_FROM,
}

export const config: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 Days expiry
  },
  providers: [EmailProvider(emailConfig)],
  pages: {
    signIn: '/login',
    // error: '/auth/error',
    // signOut: '/login'
  },
  callbacks: {
    /**
     * @param  {object} user     User object
     * @param  {object} account  Provider account
     * @param  {object} profile  Provider profile
     * @return {boolean|string}  Return `true` to allow sign in
     *                           Return `false` to deny access
     *                           Return `string` to redirect to (eg.: "/unauthorized")
     */
    async signIn(params) {
      return true
    },
    /**
     * @param  {string} url      URL provided as callback URL by the client
     * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
     * @return {string}          URL the client will be redirect to
     */
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url
      }
      return baseUrl
    },
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    async jwt({ token, user }) {
      if (user?.accountNumber) {
        token.account = user.accountNumber
      }
      if (user?.id) {
        token.id = user.id
      }
      return token
    },
    /**
     * @param  {object} session      Session object
     * @param  {object} user         User object    (if using database sessions)
     * @return {object}              Session that will be returned to the client
     */
    async session({ session, user, token }) {
      let _token: any = token
      if (_token) {
        process.env.DATABASE_NAME = _token.account
      }
      return { ...session, user: { ...user, ...token } }
    },
  },
}
