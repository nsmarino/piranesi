import type { NextApiRequest, NextApiResponse } from 'next'
import getOrderFromPrintful from './calls/printful/create-order'
import getPaymentIntentFromStripe from './calls/stripe/create-payment-intent'

export default async (req:NextApiRequest, res:NextApiResponse) => {
  if (req.method === 'POST') {
    const { data } = await getOrderFromPrintful(req.body)

    const draftOrder = data.result

    const { client_secret } = await getPaymentIntentFromStripe(draftOrder)

    res.status(200).json({ client_secret })

  } else {
    res.status(400).json({ success: false })
  }  

}