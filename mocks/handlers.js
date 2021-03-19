import { rest } from 'msw'
import MOCK_getAllPrintfulProducts from './resolvers/getAllPrintfulProducts'

export const handlers = [
  rest.get('https://api.printful.com/store/products', (req, res, ctx) => {
    console.log('MOCKING getAllPrintfulProducts')
    return res(
      ctx.json(MOCK_getAllPrintfulProducts)
    )
  }),
  // rest.get('https://api.printful.com/store/products/:id', (req, res, ctx) => {
  //   const { id } = req.params
  //   console.log('MOCKING getPrintfulProductById,', id)

  //   const product = MOCK_getPrintfulProductById.find(p=>p.result.sync_product.id===id)
  //   return res(
  //     ctx.json({})
  //   )
  // }),
]
