import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const endpoint = 'https://api.printful.com/orders/estimate-costs'

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

    const orderCosts:iOrderCosts = data.result

    res.status(200).json(orderCosts)
  } else {
    res.status(400).json({ success: false })
  } 
}