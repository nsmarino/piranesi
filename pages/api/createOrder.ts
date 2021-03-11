import type { NextApiRequest, NextApiResponse } from 'next'
import createPrintfulOrder from './calls/printful/create-order'
import getRetailTotal from './calls/cms/get-retail-total'
import getPaymentIntentFromStripe from './calls/stripe/create-payment-intent'
import errorHandler from '../../utils/errorHandler'

// Shipping and tax info comes from Printful order.
// Retail price comes from CMS.
// They are added together and sent to Printful -- thats the amount customer will be charged.

// All handled on server side so fees cannot be manipulated by client.

export default async (req:NextApiRequest, res:NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const order:iOrder = req.body
      const retailTotal= getRetailTotal(order.items)

      // Draft order is created.
      const { data: {
        result: {
          costs: {
            shipping,
            tax
          }
        }
      } } = await createPrintfulOrder(order)
          
      const amountForStripe:number = (parseInt(shipping,10)+parseInt(tax,10)+retailTotal)*100

      const draftOrder:iDraftOrder = {
        amount: amountForStripe,
        description: 'Megalith order'
      }

      const { client_secret } = await getPaymentIntentFromStripe(draftOrder)
    
      res.status(200).json({ client_secret })
    } catch (err) {
      errorHandler(err, res)
    }
  } else {
    res.status(400).json({ success: false })
  }  

}