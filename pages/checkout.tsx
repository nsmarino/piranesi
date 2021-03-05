import { useState } from 'react'
import { useCart } from 'react-use-cart'

// Components:
import Layout from '../components/Layout'
import CheckoutForm from '../components/CheckoutForm'
import CheckoutSidebar from '../components/CheckoutSidebar';

const Checkout:React.FC = () => {
  const { cartTotal } = useCart()
  const [costDisplay, setCostDisplay] = useState<iCostDisplay>({
    subtotal: cartTotal,
    estimates: 0,
    total: cartTotal,
  })
    
  return (
    <Layout title="Checkout">
      <h2>Checkout</h2>

        <CheckoutForm
          setCostDisplay={setCostDisplay}
        />

        <CheckoutSidebar 
          costs={costDisplay} 
        />  
    </Layout>
  )
}

export default Checkout