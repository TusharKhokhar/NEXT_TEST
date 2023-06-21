import { getPrismaClientAsync } from 'db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllSchema } from 'db/utils'
import { sendEmail } from '../helper/sendemail'

const generateQuery = (schemas: any) => {
  let query = ''
  if (schemas.length) {
    let newSchemas = [...schemas]
    newSchemas.forEach((schema: any, index: any) => {
      newSchemas[index] = 'SELECT * FROM `' + `${schema}` + '`.users'
    })
    query = `CREATE OR REPLACE VIEW UsersView AS ${newSchemas.join(
      ' UNION ALL '
    )}`
  }
  return query
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const DATBASE_NAME = 'leadtailor'
  const body = JSON.parse(req.body)
  if (req.method === 'POST') {
    try {
      // const prisma = getPrismaClient(DATBASE_NAME)
      // const schemas: any = await getAllSchema()
      // // await prisma.$executeRawUnsafe(`DROP VIEW leadtailor.UsersView`)
      // const query = generateQuery(schemas)
      // console.log("query----->>>>>>>",query)
      // await prisma.$executeRawUnsafe(`${query}`)

      // process.env.DATABASE_NAME = body.accountNumber
      // if (body.selectedPlan === 'Corporate') {
      //   const subject = 'User is registered on leadtailor'
      //   const adminEmailTemplate = `
      //                           <div>
      //                            <p>Dear Admin</p>
      //                            <p>User is successfully registered!</p>
      //                            </div>
      //                       `
      //   // await sendEmail(body.email, subject, emailTemplate)
      //   await sendEmail('deepak.gupta@nlstech.net', subject, adminEmailTemplate);
      // }
      // prisma.$disconnect()
      return res.json({ data: 'success' })
    } catch (error) {
      console.log(error)
      res.json({ error: 'Unable to create view' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
