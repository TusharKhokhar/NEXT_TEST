import type { NextApiRequest, NextApiResponse } from 'next'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const id = req.body.id as string
      // we can't delete the product so make it archieve product
      const product = await stripe.products.update(id, {
        active: false,
      })
      res.json(product)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
