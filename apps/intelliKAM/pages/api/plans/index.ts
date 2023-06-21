import type { NextApiRequest, NextApiResponse } from 'next'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const stripeProducts = await stripe.products.list()
      const prices = await stripe.prices.list()

      const products: any = [];
      stripeProducts.data.map((product: any) => {
        if (product.active) {
          const price = prices.data.find(
            (price: any) => price.id === product.default_price
          )
          products.push({
            id: product.id,
            name: product.name,
            priceId: price.id,
            includedVideos: product.metadata.includedVideos,
            features: JSON.parse(product.description),
            price: Number(price.unit_amount) / 100,
          }) 
        }
      })

      return res.json(products.sort((a:any, b:any) => a.price - b.price))
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
