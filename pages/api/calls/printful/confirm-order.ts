import axios from 'axios'

export default async (printfulOrderId) => {
  const res = axios.post(`https://api.printful.com/orders/${printfulOrderId}/confirm`, {
    headers: {
      'Authorization': `Basic ${Buffer.from(process.env.PRINTFUL_API_KEY).toString('base64')}`
    },
  })
  
  return res
}