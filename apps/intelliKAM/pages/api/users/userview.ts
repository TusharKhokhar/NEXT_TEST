import { getPrismaClientAsync } from 'db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { email } = JSON.parse(req.body)
      const prisma = await getPrismaClientAsync('leadtailor')
      const user: any =
        await prisma.$queryRaw`SELECT * FROM UsersView where email = ${email}`
      if (!user.length) {
        return res.json({ error: 'user with this email is not registered' })
      }
      const accountNumber = parseInt(user[0].accountNumber)
      return res.json({ data: { account: accountNumber } })
    } catch (error) {
      return res.json({ error: 'user with this email is not registered' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
