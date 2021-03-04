// UI logic
import { useEffect, useState } from 'react';
import { useForm, FormProvider, FieldErrors } from 'react-hook-form';
import { useStripe, useElements } from '@stripe/react-stripe-js';

// UI components
import ShippingForm from './Form/ShippingForm'
import PaymentForm from './Form/PaymentForm'
import ShippingInfo from './ShippingInfo';

// UI-server communication
import axios from 'axios'

interface iCheckoutForm {
  items: iItem[], 
  setCostDisplay: React.Dispatch<React.SetStateAction<iCostDisplay>>
}

const CheckoutForm:React.FC<iCheckoutForm> = ({ items, setCostDisplay }) => {
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
  const estimateOrderCosts = async (shippingAddress:iRecipient, items:iItem[]) => {
    setLoading(true)
    const order:iOrder = {
      recipient: shippingAddress,
      items
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

  const onSubmit = (shippingAddress:iRecipient) => {
    readyForCheckout ?
      checkout({recipient, items})
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
// import { Stripe } from '@stripe/stripe-js';
// import { useForm, FormProvider } from 'react-hook-form';
// import ShippingForm from './Form/ShippingForm'
// import PaymentForm from './Form/PaymentForm'
// import ShippingInfo from './ShippingInfo';
// import { useEffect } from 'react';

// interface iCheckoutForm {
//   loading: boolean
//   readyForCheckout: boolean 
//   setReadyForCheckout: React.Dispatch<React.SetStateAction<boolean>>
//   submit: (data:iOrder) => void
//   stripe: Stripe
//   recipient: iRecipient
//   items: iItem[]
// }

// const CheckoutForm:React.FC<iCheckoutForm> = ({ 
//   loading, 
//   readyForCheckout,
//   setReadyForCheckout, 
//   submit, 
//   items, 
//   stripe,
//   recipient 
// }) => {
//   const methods = useForm<iRecipient>()
  
//   useEffect(() => {
//     if(!readyForCheckout) {
//       methods.reset({...recipient})
//     }
//   },
//   [readyForCheckout])



//   return (
//     <FormProvider {...methods}>
//       <form
//         onSubmit={methods.handleSubmit(() => {
//           submit({recipient, items}) // Recipient from state
//         })}
//       >
//         {readyForCheckout ?
//           <>
//           <ShippingInfo 
//             recipient={recipient}
//             setReadyForCheckout={setReadyForCheckout}
//           />
//           <PaymentForm
//             stripe={stripe}
//             readyForCheckout={readyForCheckout} 
//             loading={loading}
//           />
//           </>
//         :
//           <ShippingForm loading={loading} />      
//         }
        
//       </form>
//     </FormProvider>  
//   )
// }

// export default CheckoutForm