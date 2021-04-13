import { rest } from 'msw'

import MOCK_createPrintfulOrder from './resolvers/createPrintfulOrder'
import MOCK_estimatePrintfulOrderCosts from './resolvers/estimatePrintfulOrderCosts'
import MOCK_confirmPrintfulOrder from './resolvers/confirmPrintfulOrder'

export const handlers = [

  // Estimate Printful Order Costs
  rest.post('https://api.printful.com/orders/estimate-costs', (req, res, ctx) => {
    console.log(req)
    return res(
      ctx.json(MOCK_estimatePrintfulOrderCosts)
    )
  }),
  // Create Printful Order
  rest.post('https://api.printful.com/orders', (req, res, ctx) => {
    console.log(req)
    return res(
      ctx.json(MOCK_createPrintfulOrder)
    )
  }),

  // Confirm Printful Order
  rest.post(`https://api.printful.com/orders/:id/confirm`, (req, res, ctx) => {
    console.log(req)
    return res(
      ctx.json(MOCK_confirmPrintfulOrder)
    )
  }),

]
