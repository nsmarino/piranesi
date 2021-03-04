import Head from 'next/head'
import Link from 'next/link'

const Layout:React.FC<{title: string}> = ({title, children}) => {

  return (
    <div style={{width: '800px', margin: '0 auto', padding: '1rem'}}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/"><a><h1>Megalith 2</h1></a></Link>
      {children}
    </div>
  )
}

export default Layout