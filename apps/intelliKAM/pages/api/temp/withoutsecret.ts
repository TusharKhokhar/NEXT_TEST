console.log('Without secret manager : start time===', Date.now())
import { getPrismaClientSync } from 'db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Without secret manager : start time inside api ===', Date.now())

  if (req.method === 'GET') {
    const DATABASE_USER_NAME: any = process.env.DATABASE_USER_NAME
    const DATABASE_PASSWORD: any = process.env.DATABASE_PASSWORD
    const DATABASE_HOST: any = process.env.DATABASE_HOST
    const DATABASE_PORT: any = process.env.DATABASE_PORT

    const prisma = getPrismaClientSync(
      DATABASE_USER_NAME,
      DATABASE_PASSWORD,
      DATABASE_HOST,
      DATABASE_PORT,
      'leadtailor'
    )

    const data = await prisma.user.findMany({})
    console.log('Without secret manager : End time inside api===', Date.now())
    await prisma.$disconnect()
    return res.json({ data: data })
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
