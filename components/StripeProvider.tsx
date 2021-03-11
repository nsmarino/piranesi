import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Used in pages/_app.tsx

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const StripeProvider:React.FC = ({ children }) => 
  <Elements stripe={stripePromise}>
    {children}
  </Elements>;

export default StripeProvider;