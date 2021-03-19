import { useState } from 'react'
// Data layer:
import { GetStaticProps } from 'next' 
import getPrintfulProducts from '../datasources/printful/printful'
import cms from '../datasources/cms/cms'
// Components:
import Layout from '../components/Layout'
import Product from '../components/Product'
import Cart from '../components/Cart'
import CartToggle from '../components/CartToggle'

const Home:React.FC<{products:iProduct[]}> = ({ products }) => {
  const [cartVis, setCartVis] = useState(false)
  return (
    <Layout title="Home">
      <main>
        {products.map(product => 
          <Product 
            product={product} 
            key={product.sync_product.id} 
          />
        )}
      </main>
      <CartToggle setVis={setCartVis} />
      <Cart vis={cartVis} setVis={setCartVis} />

    </Layout>
  )
}
export default Home

export const getStaticProps:GetStaticProps = async (context) => {

  // const res = await axios.get('https://my.backend/book')
  // console.log(res)

  const initialProducts = await getPrintfulProducts()

  // Remove Unearthed Tshirt -- Printful does not offer a convenient
  // way to differentiate between size variants and color variants
  const filteredProducts = initialProducts.filter(p=>p.sync_product.id !== 196894371)
  
  // Add data from CMS (currently just a JS file but could easily be refactored to headless cms)
  const products = filteredProducts.map(product => {
    const cmsData = cms.find(cmsProduct => cmsProduct.id===product.sync_product.id)
    return {...product, cmsData}
  })

  return {
    props: {
      products
    }
  }
}