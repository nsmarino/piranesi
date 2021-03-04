import { CardElement } from '@stripe/react-stripe-js';
import { Stripe } from '@stripe/stripe-js';

interface iPaymentForm {
  stripe: Stripe
  readyForCheckout: boolean
  loading: boolean
}

const PaymentForm:React.FC<iPaymentForm> = ({stripe, readyForCheckout, loading}) => {
  return (<>
  <h3>payment</h3>
    <div style={{width: '500px', background: 'white', border: '2px solid purple', padding: '10px', borderRadius: '5px'}}>
      <CardElement
      />
      <button
          type="submit"
          disabled={ !stripe || !readyForCheckout || loading }
        >{loading ? 'LOADING' : 'Submit order'}
        </button>     
    </div>
    </>
  )
}

export default PaymentForm