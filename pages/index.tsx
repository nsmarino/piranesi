/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'

// Data layer:
import { GetStaticProps } from 'next' 
import getPrintfulProducts from '../datasources/printful/printful'
import cms from '../datasources/cms/cms'

// Components:
import Layout from '../components/Layout'
import Product from '../components/Product'
import Cart from '../components/Cart'

const Main_CSS = css`
display: flex;
max-width: 900px;
flex-wrap: wrap;
justify-content: center;
`

const Home:React.FC<{products:iProduct[]}> = ({ products }) => {
  return (
    <Layout title="Home">
      <main css={Main_CSS}>
        {products.map(product => 
          <Product 
            product={product} 
            key={product.sync_product.id} 
          />
        )}
      </main>
      <Cart />
    </Layout>
  )
}
export default Home

export const getStaticProps:GetStaticProps = async (context) => {

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