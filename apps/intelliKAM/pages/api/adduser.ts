import { getPrismaClientAsync } from 'db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body)
  const DATBASE_NAME = !parseInt(body.accountNumber)
    ? 'leadtailor'
    : `${body.accountNumber}`

  if (req.method === 'POST') {
    const prisma = await getPrismaClientAsync(DATBASE_NAME)

    const response = await prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        jobTitle: body.jobTitle,
        accountNumber: body.accountNumber,
        userType: body.userType,
      },
    })
    res.json({ data: response })
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
