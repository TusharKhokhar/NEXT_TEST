import { config } from 'auth'
import { getPrismaClientAsync } from 'db'
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { execSync } from 'child_process'

export default async function auth(req: any, res: any) {
  if (req.query.nextauth.includes('signin')) {
    // try {
    //   const output: any = execSync(
    //     'aws secretsmanager get-secret-value  --secret-id users --region ap-southeast-1',
    //     { encoding: 'utf-8' }
    //   )
    //   const { SecretString } = JSON.parse(output)
    //   const usersList = JSON.parse(SecretString)
    //   const { email } = req.body
    //   if (usersList && usersList[email]) {
    //     newConfig.adapter = PrismaAdapter(getPrismaClientAsync(usersList[email]))
    //   } else {
    //     return res.status(500).json({
    //       error: 'user with this email is not exist',
    //     })
    //   }
    // } catch (err: any) {
    //   console.log('err : ', err)
    //   return res.status(500).json({
    //     error: 'unable to login',
    //   })
    // }
    const prisma = await getPrismaClientAsync(req.query.account)
    config.adapter = PrismaAdapter(prisma)
  }
  return await NextAuth(req, res, config)
}
