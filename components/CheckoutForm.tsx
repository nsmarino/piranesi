import { Stripe } from '@stripe/stripe-js';
import { useForm, FormProvider } from 'react-hook-form';
import ShippingForm from './Form/ShippingForm'
import PaymentForm from './Form/PaymentForm'
import ShippingInfo from './ShippingInfo';
import { useEffect } from 'react';

interface iCheckoutForm {
  loading: boolean
  readyForCheckout: boolean 
  setReadyForCheckout: React.Dispatch<React.SetStateAction<boolean>>
  submit: (data:iOrder) => void
  stripe: Stripe
  recipient: iRecipient
  items: iItem[]
}

const CheckoutForm:React.FC<iCheckoutForm> = ({ 
  loading, 
  readyForCheckout,
  setReadyForCheckout, 
  submit, 
  items, 
  stripe,
  recipient 
}) => {
  const methods = useForm<iRecipient>()
  
  useEffect(() => {
    if(!readyForCheckout) {
      methods.reset({...recipient})
    }
  },
  [readyForCheckout])

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(() => {
          submit({recipient, items}) // Recipient from state
        })}
      >
        {readyForCheckout ?
          <>
          <ShippingInfo 
            recipient={recipient}
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