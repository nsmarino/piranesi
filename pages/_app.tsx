import type { AppProps /*, AppContext */ } from 'next/app'
import StripeProvider from '../components/StripeProvider';
import { CartProvider } from 'react-use-cart';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StripeProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </StripeProvider>
  )
}

export default MyApp
