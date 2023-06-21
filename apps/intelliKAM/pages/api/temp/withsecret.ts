console.log('With secret manager : start time===', Date.now())
import { getPrismaClientSync } from 'db'
import { getSecretValue } from 'db/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('With secret manager : start time inside api ===', Date.now())

  if (req.method === 'GET') {
    const secretName =
      process.env.MODE === 'development'
        ? 'local_database_cred'
        : 'database_cred'

    const secrets = await getSecretValue(secretName)

    const {
      DATABASE_USER_NAME,
      DATABASE_PASSWORD,
      DATABASE_HOST,
      DATABASE_PORT,
    } = secrets

    const prisma = getPrismaClientSync(
      DATABASE_USER_NAME,
      DATABASE_PASSWORD,
      DATABASE_HOST,
      DATABASE_PORT,
      'leadtailor'
    )

    const data = await prisma.user.findMany({})
    console.log('With secret manager : End time inside api===', Date.now())
    await prisma.$disconnect()
    return res.json({ data: data })
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
