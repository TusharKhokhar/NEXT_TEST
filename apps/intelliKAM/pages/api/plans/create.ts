import type { NextApiRequest, NextApiResponse } from 'next'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const data = req.body
      const product = await stripe.products.create({
        name: data.name,
        description: data.features.length ? JSON.stringify(data.features) : '',
        metadata: {
          includedVideos: data.includedVideos || 0,
        },
        default_price_data: {
          currency: 'usd',
          unit_amount: Number(data.price) * 100,
          recurring: { interval: 'month' },
        },
      })
      res.json(product);
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
