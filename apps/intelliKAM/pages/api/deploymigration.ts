import type { NextApiRequest, NextApiResponse } from 'next'
import {
  applyCreatedMigration,
  getAllSchema,
  getDataBaseUrl,
} from 'db/utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const schemaRes: any = await getAllSchema()

      let migrationAppliedToSchema: any = []
      for (const schema of schemaRes) {
        process.env.DATABASE_URL = await getDataBaseUrl(schema)
        const isMigrationApplied = await applyCreatedMigration()
        if (isMigrationApplied) {
          migrationAppliedToSchema.push(schema)
        }
      }
      return res.send({
        data: 'Your database is now in sync with your schema.',
        schemas: migrationAppliedToSchema,
      })
    } catch (error) {
      res.status(500).send({ error })
      console.log('error: ', error)
    }
  }
}
