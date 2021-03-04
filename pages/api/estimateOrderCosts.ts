import type { NextApiRequest, NextApiResponse } from 'next'
import printfulEstimateCosts from './calls/printful/estimate-costs'

export default async (req:NextApiRequest, res:NextApiResponse) => {
  if (req.method === 'POST') {
    const { data } = await printfulEstimateCosts(req.body)

    const orderCosts:iOrderCosts = data.result

    res.status(200).json(orderCosts)
    
  } else {
    res.status(400).json({ success: false })
  } 
}