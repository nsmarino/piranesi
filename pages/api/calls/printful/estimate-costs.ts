import axios from 'axios'
const endpoint = 'https://api.printful.com/orders/estimate-costs'

export default async (order:iOrder) => {
  const res = await axios.post(
    endpoint, 
    order,
    {
      headers: {
        'Authorization': `Basic ${Buffer.from(process.env.PRINTFUL_API_KEY).toString('base64')}`
      }
    }
  )
  return res
}