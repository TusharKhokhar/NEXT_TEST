import type { NextApiRequest, NextApiResponse } from 'next'
import { exec } from 'child_process'
import { getDataBaseUrl } from 'db/utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const body = JSON.parse(req.body)
      const DATBASE_NAME = body.dbName

      process.env.DATABASE_URL = await getDataBaseUrl(DATBASE_NAME)
      const env = process.env.DATABASE_URL as string

      const { stdout } = await exec(`yarn run prisma migrate deploy`)

      stdout?.on('data', function (data) {
        console.log('stdout: ' + data.toString())
      })

      res.json({
        env,
      })
    } catch (error) {
      console.log('error: ', error)
    }
  }
}
