/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'

import { useContext } from 'react'
import ErrorContext from '../context/ErrorContext'

import Head from 'next/head'
import Link from 'next/link'

import Error from './Error'

const Layout_CSS = css`
display: flex;
flex-direction:column;
align-items:center;
  h1 {
    font-size: 500%;
    text-align: center;
    color: black;
    font-family: Megalith;
  }

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
            href="/fonts/Computer-Modern.ttf"
            as="font"
            crossOrigin=""
          />
        <link
            rel="preload"
            href="/fonts/Megalith-Regular.ttf"
            as="font"
            crossOrigin=""
          />
      </Head>
      <header>
      <Link href="/"><a><h1>MegalitH</h1></a></Link>
      </header>
      {
        error && <Error error={error} setError={setError} />
      }
      {children}
    </div>
  )
}

export default Layout