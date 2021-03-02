import type { AppProps /*, AppContext */ } from 'next/app'
import StripeProvider from '../components/StripeProvider';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StripeProvider>
      <Component {...pageProps} />
    </StripeProvider>
  )
}

export default MyApp
