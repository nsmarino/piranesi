import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

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
      await axios.post(`https://api.printful.com/orders/${printfulOrderId}/confirm`, {
        headers: {
          'Authorization': `Basic ${Buffer.from(process.env.PRINTFUL_API_KEY).toString('base64')}`
        },
        })

      res.json({received: true})

    } catch (err) {  
      res.status(400).json({ success: false })
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");  }
}
