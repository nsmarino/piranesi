import axios from 'axios'
import util from 'util'

const endpoint = 'https://api.printful.com/store/products'

const getPrintfulProductById = async (product:iProduct_NO_VARIANTS) => {
  const res = await axios.get(`${endpoint}/${product.id}`, {
    headers: {
      'Authorization': `Basic ${Buffer.from(process.env.PRINTFUL_API_KEY).toString('base64')}`
    }
  })

  return res.data.result
}

export default getPrintfulProductById