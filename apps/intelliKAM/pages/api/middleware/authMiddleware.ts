import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { config } from 'auth'

const authMiddleware =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const session: any = await getServerSession(req, res, config)

      const account: string =
        req.method === 'GET' ? req.query.account : JSON.parse(req.body.account)

      // check authorization
      if (!session?.user?.id) {
        return res.status(401).end({ message: 'Unauthorized' })
      }

      // check user is valid or not
      if (
        account !== session.user.account ||
        account !== process.env.DATABASE_NAME
      ) {
        return res
          .status(403)
          .end({ message: "Don't have permission to perform current action" })
      }
      //
      // Call the handler to continue processing the request
      return await handler(req, res)
    } catch (error) {
      console.log('error in authMiddleware : ', error)
      res.status(500).send({ error: 'Unable to authorize user' })
    }
  }

export default authMiddleware
