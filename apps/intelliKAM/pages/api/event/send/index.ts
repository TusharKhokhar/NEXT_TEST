import type { NextApiRequest, NextApiResponse } from 'next'

import AWS from 'aws-sdk'
AWS.config.update({ region: 'ap-southeast-1' })

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const eventBridge = new AWS.EventBridge()
      const { source, detailType, details } = req.body
      const event = {
        Source: source,
        DetailType: detailType,
        Detail: JSON.stringify(details),
        EventBusName: 'leadtailor',
        Time: new Date(),
      }
      const params = {
        Entries: [event],
      }
      const response = await eventBridge.putEvents(params).promise()
      if (response && response.FailedEntryCount !== 0) {
        return res
          .status(400)
          .json({ error: response.Entries?.[0]?.ErrorMessage })
      }
      return res.json({ data: response })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
