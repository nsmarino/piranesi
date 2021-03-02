import axios from 'axios'

const endpoint = 'https://api.printful.com/store/products'

export async function getPrintfulProducts() {
  // A GET request to the store endpoint returns basic information about
  // products. We retrieve the product IDs in this way, then send a series
  // of GET requests to each product's endpoint (ex: store/products/90835875)
  // In this way we get all info about variants, colors, et cetera.

  //  This function involves numerous GET requests. However, it only runs at build time.
  const {
    data: {
      result:productsWithoutVariantInfo
    }
  } = await axios.get(endpoint, {
    headers: {
      'Authorization': `Basic ${Buffer.from(process.env.PRINTFUL_API_KEY).toString('base64')}`
    }
  })
  
  const productDetailRequests:[Promise<iProduct>] = productsWithoutVariantInfo.map(async (product:iProduct_NO_VARIANTS)=>{
    const res = await axios.get(`${endpoint}/${product.id}`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(process.env.PRINTFUL_API_KEY).toString('base64')}`
      }
    })
    return res.data.result
  })
  
  const productsWithVariantInfo = await Promise.all(productDetailRequests)

  return productsWithVariantInfo
}





