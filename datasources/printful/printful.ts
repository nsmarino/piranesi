import getAllPrintfulProducts from './getAllPrintfulProducts'
import getPrintfulProductById from './getPrintfulProductById'
import getPrintfulVariantSizes from './getPrintfulVariantSizes'

// Only runs at build
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
  
  const productsWithVariantInfo = await Promise.all(productWithVariantsRequests)

  // More GET requests to get size for each variant (flaw in Printful API)
  const variantSizeRequests:Promise<iProduct>[] = productsWithVariantInfo
    .map(getPrintfulVariantSizes)
  
  // wait for all GET requests
  const productsWithVariantInfoAndSize = await Promise.all(variantSizeRequests)

  return productsWithVariantInfoAndSize
}

export default getPrintfulProducts



