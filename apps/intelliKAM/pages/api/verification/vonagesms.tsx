import { axios } from 'lib'
import type { NextApiRequest, NextApiResponse } from 'next'
// import { getServerSession } from 'next-auth/next'
// import { config  } from 'auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getServerSession(req, res, config)
  //   if (!session) {
  //     return res.status(401).end()
  //   }
  const body = JSON.parse(req.body)
  // if (session.user?.id !== body.id) {
  //   res.status(401).end('Unauthorized user')
  // }
  const headers = {
    'Content-Type': 'application/json',
  }
  if (req.method === 'POST') {
    try {
      const data = {
        api_key: process.env.VOINAGE_API_KEY,
        api_secret: process.env.VOINAGE_API_SECRET,
        to: body.phoneNumber,
        from: 'Leadtailor',
        text: `Your verification code is ${body.verificationCode}`,
      }
      const response: any = await axios.post(
        `${process.env.VOINAGE_ENDPOINT}/sms/json`,
        data,
        {
          headers: headers,
        }
      )
      const message = response.data.messages[0]
      if (message.status === '0') {
        res.status(200).json({ message: 'SMS message sent successfully' })
      } else {
        res.status(500).json({
          error: `Failed to send SMS message: ${message['error-text']}`,
        })
      }
    } catch (error) {
      res.status(500).json({
        error: error,
      })
    }
  }
  // else {
  //   res.setHeader('Allow', ['POST'])
  //   res.status(405).end(`Method ${req.method} Not Allowed`)
  // }
}
