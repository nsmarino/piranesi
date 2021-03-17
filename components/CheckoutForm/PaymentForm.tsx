import { useState } from 'react'
import { CardElement } from '@stripe/react-stripe-js';
import { Stripe, StripeCardElementChangeEvent } from '@stripe/stripe-js';

interface iPaymentForm {
  stripe: Stripe
  readyForCheckout: boolean
  loading: boolean
}

const PaymentForm:React.FC<iPaymentForm> = ({stripe, readyForCheckout, loading}) => {
  const [cardComplete, setCardComplete] = useState(false)
  
  const handleCardChange = (e:StripeCardElementChangeEvent) => {
    if (e.complete) setCardComplete(true)
  }

  return (
  <>
  <h3>Payment</h3>
    <div style={{width: '100%', background: 'white', border: '2px solid var(--dark)', padding: '10px', marginBottom: '0.5rem', borderRadius: '5px'}}>
      
      <CardElement onChange={e=>handleCardChange(e)} />
      </div>
      <button
          type="submit"
          disabled={ !stripe || !readyForCheckout || loading || !cardComplete }
        >{loading ? 'LOADING' : 'Submit order'}
        </button>     
    </>
  )
}

export default PaymentForm