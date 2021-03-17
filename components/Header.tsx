/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'

import Link from 'next/link'
import Image from 'next/image'

const CSS = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top:50px;
  margin-bottom: 50px;
  filter: grayscale(100%);
  .imgCon {
    width: 50%;
  }
  h1 {
    text-align:center;
    font-family: Megalith;
    margin: 0;
    font-size: 1000%;
  }
`

const Header = () => {
  return (      
    <header css={CSS}>
      <Link href="/"><a><h1>MegalitH</h1></a></Link>
      <div className="imgCon">
        <Image
          width={4800}
          height={2700}
          layout='responsive'
          src={'/forestStone.png'}
          alt={'Megalith'}
        />       
      </div>

    </header>
  )
}

export default Header