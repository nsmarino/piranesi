import getPrintfulProducts from '../datasources/printful'

// External API calls are mocked. Integration test ensures that
// correct type of data is returned from function.
jest.mock('../datasources/getAllPrintfulProducts')
jest.mock('../datasources/getPrintfulProductById')

test('Returns list of printful products', async () => {
  const products = await getPrintfulProducts()
  expect(products.length).toBe(6)
})