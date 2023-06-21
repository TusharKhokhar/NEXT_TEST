import type { NextApiRequest, NextApiResponse } from 'next'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const id = req.query.id
      const stripeProduct = await stripe.products.retrieve(id)
      const price = await stripe.prices.retrieve(stripeProduct.default_price)

      const product = {
        id: stripeProduct.id,
        name: stripeProduct.name,
        priceId: price.id,
        includedVideos: stripeProduct.metadata.includedVideos,
        features: JSON.parse(stripeProduct.description),
        price: Number(price.unit_amount) / 100,
      }
      return res.json(product)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  if (req.method === 'PUT') {
    try {
      const id = req.query.id
      const data = req.body
      const price = await stripe.prices.create({
        unit_amount: Number(data.price) * 100,
        currency: 'usd',
        recurring: {interval: 'month'},
        product: id,
      });
      const product = await stripe.products.update(id, {
        name: data.name,
        description: data.features.length ? JSON.stringify(data.features) : '',
        metadata: {
          includedVideos: data.includedVideos || 0,
        },
        default_price: price.id
      })
      return res.json(product)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
