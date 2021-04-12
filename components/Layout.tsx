/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'

import { useContext } from 'react'
import ErrorContext from '../context/ErrorContext'

import Head from 'next/head'
import Header from './Header'
import Error from './Error'

const Layout_CSS = css`
margin: 0 auto;
max-width: 900px;
`
const Layout:React.FC<{title: string}> = ({title, children}) => {
  const { error, setError } = useContext(ErrorContext)

  return (
    <div css={Layout_CSS}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
            rel="preload"
            href="/fonts/Megalith-Regular.ttf"
            as="font"
            crossOrigin=""
          />
      </Head>
      <Header />

      {
        error && <Error error={error} setError={setError} />
      }
      {children}
    </div>
  )
}

export default Layout