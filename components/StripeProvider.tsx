import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Provider component: used in pages/_app.tsx
// to wrap app so Stripe can be used client-side
const StripeProvider:React.FC = ({ children }) => {

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
  
  return <Elements stripe={stripePromise}>{children}</Elements>;
}

export default StripeProvider;