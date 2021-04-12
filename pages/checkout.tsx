/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCart } from 'react-use-cart'

// Components:
import Layout from '../components/Layout'
import CheckoutForm from '../components/CheckoutForm/CheckoutForm'
import CheckoutSidebar from '../components/CheckoutSidebar'
import Placeholder from '../components/Placeholder'
import Confirmation from '../components/Confirmation'

import { under992 } from '../styles/mediaQueries'

const Checkout:React.FC = () => {
  const { isEmpty } = useCart()
  const router = useRouter()

  const [confirmation, setConfirmation] = useState<iConfirmation>({success:false, info: ''})
  
  const [estimates, setEstimates] = useState({shipping: 0, tax: 0})

  // No products in cart = checkout cannot be viewed
  if (isEmpty) return <Placeholder />

  // On order confirmation, fake redirect to success page
  useEffect(() => {
    if (confirmation.success) router.push('/checkout', '/success', { shallow: true })
  }, [confirmation])
  if (confirmation.success) return <Confirmation confirmation={confirmation} />

  return (
    <Layout title="Checkout | Megalith">
      <main css={styles}>
        <CheckoutForm
          setEstimates={setEstimates}
          setConfirmation={setConfirmation}
        />

        <CheckoutSidebar 
          estimates={estimates}
        />  
      </main>

    </Layout>
  )
}

const styles = css`
display: flex;
${under992} {
  flex-direction: column;
  align-items: center;
}
`

export default Checkout