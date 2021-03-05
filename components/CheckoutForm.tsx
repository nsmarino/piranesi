// Hooks Department
import { useEffect, useState } from 'react';
import { useForm, FormProvider, FieldErrors } from 'react-hook-form';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from 'react-use-cart'

// UI components
import ShippingForm from './Form/ShippingForm'
import PaymentForm from './Form/PaymentForm'
import ShippingInfo from './ShippingInfo';

// client-server communication
import axios from 'axios'

interface iCheckoutForm {
  setCostDisplay: React.Dispatch<React.SetStateAction<iCostDisplay>>
}

const CheckoutForm:React.FC<iCheckoutForm> = ({ setCostDisplay }) => {
  const { items } = useCart()

  const stripe = useStripe();
  const elements = useElements();
  const methods = useForm<iRecipient>() 

  // STATE:
  const [loading, setLoading] = useState(false)
  const [readyForCheckout, setReadyForCheckout] = useState(false)
  const [recipient, setRecipient] = useState<iRecipient>({
    name: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    state_code: '',
    country_code: 'US'
  })

  useEffect(() => { // Refills form with recipient data when shipping info is edited
    if(!readyForCheckout) {
      methods.reset({...recipient})
    }
  },
  [readyForCheckout])

  // CHECKOUT HANDLERS:
  const estimateOrderCosts = async (shippingAddress:iRecipient, cartItems) => {
    setLoading(true)

    const orderItems:iOrderItem[] = cartItems.map((cartItem:iCartItem)=> {
      return {
        sync_variant_id: cartItem.sync_variant_id,
        quantity: cartItem.quantity
      }
    })
    const order:iOrder = {
      recipient: shippingAddress,
      items: orderItems
    }
    const { 
      data:orderCosts 
    } = await axios
      .post<iOrderCosts>('/api/estimateOrderCosts', order)

    setCostDisplay({
      subtotal: orderCosts.costs.subtotal,
      estimates: (orderCosts.costs.shipping + orderCosts.costs.tax),
      total: orderCosts.costs.total
    })
    setRecipient(shippingAddress)
    setReadyForCheckout(true)
    setLoading(false)
  }

  const checkout = async (recipient: iRecipient, cartItems) => {
    setLoading(true)

    const orderItems:iOrderItem[] = cartItems.map((cartItem:iCartItem)=> {
      return {
        sync_variant_id: cartItem.sync_variant_id,
        quantity: cartItem.quantity
      }
    })

    const order:iOrder = {
      recipient,
      items: orderItems
    }    

    const { data: { client_secret } } = await axios.post('/api/createOrder', order)

    const stripeConfirmation = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement('card'),
      },
    });
    console.log(stripeConfirmation)

    setLoading(false)
  }

  const onSubmit = (shippingAddress:iRecipient) => {
    readyForCheckout ?
      checkout(recipient, items)
      :
      estimateOrderCosts(shippingAddress, items)  
  }

  const onError = (errors:FieldErrors) => {
    console.log(errors)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit,onError)}
      >
        {readyForCheckout ?
          <>
          <ShippingInfo 
            recipient={recipient}
            loading={loading}
            setReadyForCheckout={setReadyForCheckout}
          />
          <PaymentForm
            stripe={stripe}
            readyForCheckout={readyForCheckout} 
            loading={loading}
          />
          </>
        :
          <ShippingForm loading={loading} />      
        }
        
      </form>
    </FormProvider>  
  )
}

export default CheckoutForm