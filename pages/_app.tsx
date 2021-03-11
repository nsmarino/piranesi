import { ErrorProvider } from '../context/ErrorContext'
import type { AppProps /*, AppContext */ } from 'next/app'
import StripeProvider from '../components/StripeProvider';
import { CartProvider } from 'react-use-cart';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorProvider>
      <StripeProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </StripeProvider>
    </ErrorProvider>
  )
}

export default MyApp
