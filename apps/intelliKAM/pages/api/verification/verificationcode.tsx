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

  if (body.accountNumber !== process.env.DATABASE_NAME) {
    return res.status(401).end('Unauthorized user')
  }
  const DATBASE_NAME = body.accountNumber
  if (req.method === 'PUT') {
    const prisma = await getPrismaClientAsync(DATBASE_NAME)
    const response = await prisma.user.update({
      where: {
        id: body.id,
      },
      data: {
        phoneNumber: body.phoneNumber,
        verificationCode: body.verificationCode,
      },
    })
    await prisma.$disconnect()
    res.status(200).json({ data: response })
  } else {
    res.setHeader('Allow', ['PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
