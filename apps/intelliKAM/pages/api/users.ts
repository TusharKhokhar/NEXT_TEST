import { getPrismaClientAsync } from "db";
import type { NextApiRequest, NextApiResponse } from 'next'

const DATBASE_NAME1 = "intellikam"
const DATBASE_NAME2 = "vodafone"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const prisma = await getPrismaClientAsync(DATBASE_NAME1);
    const users = await prisma.user.findMany();

    const prisma2 = await getPrismaClientAsync(DATBASE_NAME2);
    const users2 = await prisma2.user.findMany();

    res.json({
      users,
      users2,
    })
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
