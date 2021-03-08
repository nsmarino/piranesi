import { GetStaticProps } from 'next' 
import getPrintfulProducts from '../datasources/printful/printful'

// Components:
import Layout from '../components/Layout'
import Product from '../components/Product'
import Cart from '../components/Cart'
import cms from '../datasources/cms/cms'

const Home:React.FC<{products:iProduct[]}> = ({ products }) => {
  return (
    <Layout title="Home">
      <div style={{display: 'flex'}}>
      <main>
        <h2>Products</h2>
        {products.map(product => 
          <Product 
            product={product} 
            key={product.sync_product.id} 
          />
        )}
      </main>
      <Cart />
      </div>
    </Layout>
  )
}
export default Home

export const getStaticProps:GetStaticProps = async (context) => {

  const initialProducts = await getPrintfulProducts()

  // Remove Unearthed Tshirt -- Printful does not offer a convenient
  // way to differentiate between size variants and color variants
  const filteredProducts = initialProducts.filter(p=>p.sync_product.id !== 196894371)
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