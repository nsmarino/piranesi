import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const endpoint = 'https://api.printful.com/orders/'

// Receives webhook from Stripe and confirms Printful order.
export default async (req:NextApiRequest, res:NextApiResponse) => {
  console.log(req)

  // NOT REAL CODE:
  // const printfulResponse = await axios.post(
  //   endpoint, 
  //   dummyOrder,
  //   {
  //     headers: {
  //       'Authorization': `Basic ${Buffer.from(process.env.PRINTFUL_API_KEY).toString('base64')}`
  //     }
  //   }
  // )
  // console.log(printfulResponse)
  
  res.status(200).json({ name: 'John Doe' })
}