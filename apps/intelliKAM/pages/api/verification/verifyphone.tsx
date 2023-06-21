import { getPrismaClientAsync } from 'db'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { config } from 'auth'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, config)
  if (!session) {
    return res.status(401).end()
  }

  const body = JSON.parse(req.body)
  if (session.user?.id !== body.id) {
    res.status(401).end('Unauthorized user')
  }
  const DATBASE_NAME = body.accountNumber
  if (req.method === 'PUT') {
    const prisma = await getPrismaClientAsync(DATBASE_NAME)
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: body.id,
        },
      })
      if (!user) {
        res.status(500).json({ error: 'User is not found' })
      } else {
        if (user.verificationCode === body.verificationCode) {
          const response = await prisma.user.update({
            where: {
              id: body.id,
            },
            data: {
              phoneVerified: true,
            },
          })
          res.status(200).json({ data: response })
        } else {
          res.status(403).json({ data: 'Verification code is not matched' })
        }
      }
    } catch (error) {
      console.log('error', error)
      res.status(500).json({ error: 'Something went wrong' })
    } finally {
      await prisma.$disconnect()
    }
  } else {
    res.setHeader('Allow', ['PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
