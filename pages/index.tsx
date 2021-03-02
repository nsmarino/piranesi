import Head from 'next/head'
import { GetStaticProps } from 'next' 
// @ts-ignore
import styles from '../styles/Home.module.css'

import { getPrintfulProducts } from '../datasources/printful'

import Layout from '../components/Layout'
import Product from '../components/Product'
import Link from 'next/link'

const Home:React.FC<{products:iProduct[]}> = ({ products }) => {
  return (
    <Layout title="Home">
      <Link href="/checkout"><a>checkout</a></Link>
      <main>
        {products.map(product => 
          <Product 
            product={product} 
            key={product.sync_product.id} 
          />
        )}
      </main>
    </Layout>
  )
}
export default Home


export const getStaticProps:GetStaticProps = async (context) => {
  const products = await getPrintfulProducts()

  return {
    props: {
      products
    }, // will be passed to the page component as props
  }
}