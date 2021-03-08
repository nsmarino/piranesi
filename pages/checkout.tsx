import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCart } from 'react-use-cart'

// Components:
import Layout from '../components/Layout'
import CheckoutForm from '../components/CheckoutForm'
import CheckoutSidebar from '../components/CheckoutSidebar'
import Placeholder from '../components/Placeholder'
import Confirmation from '../components/Confirmation'

const Checkout:React.FC = () => {
  const { cartTotal, isEmpty } = useCart()
  const router = useRouter()

  const [confirmation, setConfirmation] = useState<iConfirmation>({success:false, info: ''})
  
  const [costDisplay, setCostDisplay] = useState<iCostDisplay>({
    subtotal: cartTotal,
    estimates: 0.00,
    total: cartTotal,
  })
  const [estimates, setEstimates] = useState({shipping: 0, tax: 0})

  if (isEmpty) return <Placeholder />

  useEffect(() => {
    // Shows Confirmation component 
    if (confirmation.success) router.push('/checkout', '/success', { shallow: true })
  }, [confirmation])

  if (confirmation.success) return <Confirmation confirmation={confirmation} />

  return (
    <Layout title="Checkout">
      <h2>Checkout</h2>

        <CheckoutForm
          setEstimates={setEstimates}
          setConfirmation={setConfirmation}
        />

        <CheckoutSidebar 
          estimates={estimates}
        />  
    </Layout>
  )
}

export default Checkout

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}