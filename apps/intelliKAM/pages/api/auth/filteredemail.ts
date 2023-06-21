import { getPrismaClientAsync } from 'db'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { config } from 'auth'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getServerSession(req, res, config)

  // if (!session) {
  //   return res.status(401).end()
  // }

  // if (session.user?.id !== req.query.id) {
  //   return res.status(401).end('Unauthorized user')
  // }

  // console.log('==============', req.query.accountNumber)

  if (req.query.accountNumber !== 'leadtailor') {
    return res
      .status(403)
      .send({ error: "Don't have permission to perfrom current action" })
  }

  const DATBASE_NAME: any = req.query.accountNumber
  if (req.method == 'GET') {
    const prisma = await getPrismaClientAsync(DATBASE_NAME)
    const response = await prisma.lead.findMany({
      where: {
        accountCreated: false,
        email: {
          contains: !Array.isArray(req.query.email)
            ? req.query.email
            : req.query.email[0],
        },
      },
    })
    await prisma.$disconnect()
    res.json({ data: response })
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
