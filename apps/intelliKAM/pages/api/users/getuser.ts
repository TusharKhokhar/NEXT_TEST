import { getPrismaClientAsync } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from 'next-auth/next'
import { config  } from 'auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, config) 
  if (!session) { return res.status(401).end() }

  if (req.method === "GET") {
    const DATBASE_NAME: any = req.query.accountNumber;
    const email: any = req.query.email;
    const prisma = await getPrismaClientAsync(DATBASE_NAME);
    const data = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    res.json({ data });
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}



