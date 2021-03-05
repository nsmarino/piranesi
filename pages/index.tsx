import { GetStaticProps } from 'next' 
import getPrintfulProducts from '../datasources/printful'

// Components:
import Layout from '../components/Layout'
import Product from '../components/Product'
import Cart from '../components/Cart'

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
  const products = await getPrintfulProducts()

  return {
    props: {
      products
    }
  }
}