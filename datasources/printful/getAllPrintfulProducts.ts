import axios from 'axios'
// import util from 'util'

const endpoint = 'https://api.printful.com/store/products'

const getAllPrintfulProducts = async () => {
  
  const res = await axios.get(endpoint, {
  headers: {
    'Authorization': `Basic ${Buffer.from(process.env.PRINTFUL_API_KEY).toString('base64')}`
  }
  })

  // console.log(util.inspect(res.data, {showHidden: false, depth: null}))


  return res

}

export default getAllPrintfulProducts