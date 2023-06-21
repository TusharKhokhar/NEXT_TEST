import { getSecretValue } from 'db/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body
    const users =
      process.env.MODE === 'development'
        ? await getSecretValue('local_users')
        : await getSecretValue('users')
    if (!users.hasOwnProperty(email)) {
      return res.status(500).json('user with this email is not exist')
    }
    const DATABASE_NAME = users[email]
    return res.json({ data: DATABASE_NAME })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
