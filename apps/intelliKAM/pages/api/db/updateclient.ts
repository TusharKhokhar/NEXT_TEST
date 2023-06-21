import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { account } = JSON.parse(req.body)
      process.env.DATABASE_NAME = parseInt(account) ? account : 'leadtailor'
      return res.json({ data: 'success' })
    } catch (error) {
      return res.json({ error: 'unable to update prisma client' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
