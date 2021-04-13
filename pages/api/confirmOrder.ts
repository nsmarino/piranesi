import type { NextApiRequest, NextApiResponse } from 'next'
import printfulConfirmOrder from './calls/printful/confirm-order'

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req:NextApiRequest, res:NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const {
        data: { object: paymentIntent },
      } = req.body;

      const printfulOrderId = paymentIntent.description

      await printfulConfirmOrder(printfulOrderId)

      res.json({received: true})

    } catch (err) {  
      res.status(400).json({ success: false })
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");  }
}
