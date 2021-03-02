import axios from 'axios'

import { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// Components:
import Layout from '../components/Layout'
import CartItem from '../components/CartItem'

const dummyOrder:iOrder = {
  recipient: {
    address1: '338 Main St',
    city: 'Cold Spring',
    state_code: 'NY',
    country_code: 'US',
    name: 'Nicholas Marino',
    zip: '10516'
  },
  items: [
    {
      name: "Three of Clovers Long Sleeve",
      thumbnail_url: "https://files.cdn.printful.com/files/3b9/3b923458f7181d7dccda88e0a41b8a9a_preview.png",
      sync_variant_id: 2317366105,
      quantity: 2
    }
  ]
}

const Checkout:React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [costs, setCosts] = useState({
    subtotal: 0,
    estimates: 0,
    total: 0,
  })
  const [loading, setLoading] = useState(false)
  const [readyForCheckout, setReadyForCheckout] = useState(false)


  const estimateOrderCosts = async () => {
    setLoading(true)

    const { 
      data:orderCosts 
    } = await axios
      .post<iOrderCosts>('/api/estimateOrderCosts', dummyOrder)

    setCosts({
      subtotal: orderCosts.costs.subtotal,
      estimates: (orderCosts.costs.shipping + orderCosts.costs.tax),
      total: orderCosts.costs.total
    })
    setReadyForCheckout(true)
    setLoading(false)
  }

  const handleCheckout = async () => {
    setLoading(true)
    const { data: { client_secret } } = await axios.post('/api/createOrder', dummyOrder)

    const stripeConfirmation = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement('card'),
      },
    });

    setLoading(false)
  }

  return (
    <Layout title="Checkout">
      <h1>Testing Facility: Checkout</h1>
      <p>Order info:</p>
      <div style={{border: '4px ridge purple', width: 'fit-content'}}>
      {dummyOrder.items.map(item => <CartItem item={item} key={item.sync_variant_id} />)}
      </div>
      <p>Subtotal {costs.subtotal}</p>
      <p>Shipping and Taxes {costs.estimates}</p>
      <p>Total {costs.total}</p>
      <button style={{display: 'block',}} onClick={estimateOrderCosts} disabled={loading || readyForCheckout}>Estimate Order Costs</button>
      <p>Card info:</p>
      <p>4242424242424242 555 10/23</p>
      <div style={{width: '250px', background: 'white', border: '1px solid purple', padding: '10px', borderRadius: '5px'}}>
        <CardElement
          options={{ hidePostalCode: true }}
        />      
      </div>

      <button style={{display: 'block',}} onClick={handleCheckout} disabled={!readyForCheckout || loading}>Place Order</button>
    </Layout>
  )
}

export default Checkout