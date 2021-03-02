import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});
const endpoint = 'https://api.printful.com/orders'

export default async (req:NextApiRequest, res:NextApiResponse) => {
  if (req.method === 'POST') {
    const { data } = await axios.post(
      endpoint, 
      req.body,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(process.env.PRINTFUL_API_KEY).toString('base64')}`
        }
      }
    )

    const draftOrder = data.result

    const { client_secret } = await stripe.paymentIntents.create({
      amount: draftOrder.costs.total*100,
      currency: 'usd',
      description: draftOrder.id,
    })

    res.status(200).json({ client_secret })

  } else {
    res.status(400).json({ success: false })
  }  

}