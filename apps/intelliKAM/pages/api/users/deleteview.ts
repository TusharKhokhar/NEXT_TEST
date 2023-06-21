import { getPrismaClientAsync } from 'db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllSchema } from 'db/utils'

const initializeView = (schemas: any) => {
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
        const schemas: any = await getAllSchema();
        const dropSchema = await getPrismaClientAsync(body.database)
        const user = await dropSchema.user.findFirst({
          where:{
            accountNumber : body.database
          }
        });
        
        if (schemas.includes(body.database)) {
            const dbName = '`'+body.database+'`';
            await dropSchema.$executeRawUnsafe('DROP DATABASE '+dbName);
            dropSchema.$disconnect()
        }else{
          return res.json({ error: 'Database does not exists' })
        }
        
        const refreshedSchema: any = await getAllSchema();
        const prisma = await getPrismaClientAsync(DATBASE_NAME)
        if(user){
          const deletedRecord = await prisma.lead.deleteMany({
            where: {
              email: {
                equals : user.email ? user.email : ''
              },
            }
          });
        }
        const query = initializeView(refreshedSchema)
        
        await prisma.$executeRawUnsafe(`${query}`)
        prisma.$disconnect()
        return res.json({ data: 'success' })
      } catch (error) {
        console.log(error)
        res.json({ error: 'Unable to drop view' })
      }
    } else {
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }