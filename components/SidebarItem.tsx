/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'

const CSS = css`
background: var(--dark);
display: flex;
align-items: center;
margin-bottom: 0.5rem;
padding: 0.5rem;
.imgCon {
  font-size: 0;
}
.text {
  padding: 0.5rem;
}
p {
  font-family: 'Courier New', Courier, monospace;
  margin: 0.2rem;
  color: white;
}
`

import Image from "next/image"

const SidebarItem:React.FC<{ item:iCartItem }> = ({ item }) => {
  
  return (
    <div css={CSS}>
      <div className='imgCon'>
        <Image
          src={item.image}
          alt={item.name}
          width={100}
          height={100}
        />
      </div>
      <div className="text">
        <p>{item.name}</p>
        <p>{item.size}</p>
        <p>${item.price}.00</p>
        <p>{item.quantity}</p>
      </div>
    </div>
  )
}

export default SidebarItem