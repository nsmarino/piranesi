import type { NextApiRequest, NextApiResponse } from 'next'
import printfulEstimateCosts from './calls/printful/estimate-costs'
import errorHandler from '../../utils/errorHandler'

export default async (req:NextApiRequest, res:NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { data } = await printfulEstimateCosts(req.body)

      const orderCosts:iOrderCosts = data.result

      res.status(200).json(orderCosts)

    } catch (err) {
      errorHandler(err, res)
    }
  } else {
    res.status(400).json({ success: false })
  } 
}