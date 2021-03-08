import { useContext } from 'react'
import ErrorContext from '../context/ErrorContext'

import Head from 'next/head'
import Link from 'next/link'

import Error from './Error'

const Layout:React.FC<{title: string}> = ({title, children}) => {
  const { error, setError } = useContext(ErrorContext)

  return (
    <div style={{width: '800px', margin: '0 auto', padding: '1rem'}}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/"><a><h1>Megalith 2</h1></a></Link>
      {
        error && <Error error={error} setError={setError} />
      }
      {children}
    </div>
  )
}

export default Layout