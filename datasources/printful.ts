import getAllPrintfulProducts from './getAllPrintfulProducts'
import getPrintfulProductById from './getPrintfulProductById'

async function getPrintfulProducts() {
  // Printful API will not return variant info for all products from single endpoint
  const {
    data: {
      result:productsWithoutVariantInfo 
    }
  } = await getAllPrintfulProducts()

  
  // GET request to each id endpoint
  const productWithVariantsRequests:[Promise<iProduct>] = productsWithoutVariantInfo
    .map(getPrintfulProductById)
  
  // wait for all GET requests
  const productsWithVariantInfo = await Promise.all(productWithVariantsRequests)

  return productsWithVariantInfo
}

export default getPrintfulProducts



