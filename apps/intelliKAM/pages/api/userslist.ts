import { getPrismaClientAsync } from 'db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllSchema } from 'db/utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const userId: any = req.query.userId
    const accountNumber: any = req.query.accountNumber

    let userList: any = []
    res.json({ data: userList })
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
