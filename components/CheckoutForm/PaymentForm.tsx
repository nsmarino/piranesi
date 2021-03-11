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
  <h3>payment</h3>
    <div style={{width: '500px', background: 'white', border: '2px solid purple', padding: '10px', borderRadius: '5px'}}>
      
      <CardElement onChange={e=>handleCardChange(e)} />

      <button
          type="submit"
          disabled={ !stripe || !readyForCheckout || loading || !cardComplete }
        >{loading ? 'LOADING' : 'Submit order'}
        </button>     
    </div>
    </>
  )
}

export default PaymentForm