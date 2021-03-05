import axios from 'axios'
const endpoint = 'https://api.printful.com/products/variant'

// This is the only endpoint in the Printful API that returns size data for each variant
const getPrintfulVariantSizes = async (product:iProduct) => {
  const variantsWithSize = await Promise.all(
    product.sync_variants.map(async (variant) => {
      const res = await axios.get(`${endpoint}/${variant.variant_id}`, {
        headers: {
          'Authorization': `Basic ${Buffer.from(process.env.PRINTFUL_API_KEY).toString('base64')}`
        }
      }
      )
      const variantSize = res.data.result.variant.size
      return {
        ...variant,
        variant_size: variantSize
      }
    })
  )
  
  return {
    ...product,
    sync_variants: variantsWithSize
  }
}

export default getPrintfulVariantSizes