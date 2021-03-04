import { useState } from 'react'
import axios from 'axios'
import { useStripe, useElements } from '@stripe/react-stripe-js';

// Components:
import Layout from '../components/Layout'
import CheckoutForm from '../components/CheckoutForm'
import CheckoutSidebar from '../components/CheckoutSidebar';

const dummyItems:iItem[] = [{
  name: "Three of Clovers Long Sleeve",
  thumbnail_url: "https://files.cdn.printful.com/files/3b9/3b923458f7181d7dccda88e0a41b8a9a_preview.png",
  sync_variant_id: 2317366105,
  quantity: 2
}]

// TODO: Decide what state should live here 
// and what should live in CheckoutForm.tsx
const Checkout:React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

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
  const [costDisplay, setCostDisplay] = useState<iCostDisplay>({
    subtotal: 0,
    estimates: 0,
    total: 0,
  })

  const estimateOrderCosts = async (order:iOrder) => {
    setLoading(true)

    const { 
      data:orderCosts 
    } = await axios
      .post<iOrderCosts>('/api/estimateOrderCosts', order)

    setCostDisplay({
      subtotal: orderCosts.costs.subtotal,
      estimates: (orderCosts.costs.shipping + orderCosts.costs.tax),
      total: orderCosts.costs.total
    })
    setRecipient(order.recipient)
    setReadyForCheckout(true)
    setLoading(false)
  }
  const checkout = async (order:iOrder) => {
    setLoading(true)
    const { data: { client_secret } } = await axios.post('/api/createOrder', order)

    const stripeConfirmation = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement('card'),
      },
    });
    // console.log(stripeConfirmation)

    setLoading(false)
  }

  const submit = (order:iOrder,) => {
    readyForCheckout ? checkout(order) : estimateOrderCosts(order)
  }

  return (
    <Layout title="Checkout">
      <h2>Checkout</h2>
      
        <CheckoutForm 
          readyForCheckout={readyForCheckout}
          setReadyForCheckout={setReadyForCheckout}
          submit={submit}
          stripe={stripe}
          loading={loading}
          items={dummyItems}
          recipient={recipient}
        />

        <CheckoutSidebar 
          items={dummyItems} 
          costs={costDisplay} 
        />  
    </Layout>
  )
}

export default Checkout