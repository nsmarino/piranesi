import axios from 'axios'
const endpoint = 'https://api.printful.com/products/variant'

const getPrintfulProductVariantSizeById:(id: number) => Promise<{id:number, size:string}> = async (id) => {
  const res = await axios.get(`${endpoint}/${id}`, {
    headers: {
      'Authorization': `Basic ${Buffer.from(process.env.PRINTFUL_API_KEY).toString('base64')}`
    }
  })
  return {
    id,
    size: res.data.result.variant.size
  }
}

export default getPrintfulProductVariantSizeById