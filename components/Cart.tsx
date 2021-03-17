/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'

import { useState, useEffect } from 'react'
import { useCart } from 'react-use-cart'
import Link from 'next/link'
import CartItem from "./CartItem"
import currency from '../utils/currency'

const CSS = css`
background: var(--light);
position: fixed;
top: 0;
height: 100vh;
width: 20%;
padding: 0.5rem;
transition: right 0.4s;
h2 {
  font-family: Megalith;
  font-size: 400%;
  margin: 0;
}
.closeBtn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: var(--dark);
  border: none;
  width: 3rem;
  height: 3rem;
  color: white;
  font-weight: bold;
  :hover {
    color: white;
    background: black;
  }

}

.checkoutBtn {
  background: var(--dark);
  border: none;  
  width: 100%;
  height: 3rem;
  color: white;
  font-weight: bold;
  :hover {
    color: white;
    background: black;
  }

}
p {
  font-family: Arial;
}
`

const Cart = ({ vis, setVis }) => {
  const { items, cartTotal, isEmpty } = useCart()
  const [inBrowser, setInBrowser] = useState(false)

  // Only runs code once app has mounted to DOM in browser
  // Needed because cart information is kept in localStorage
  useEffect(() => {
    setInBrowser(true)
  },[])

  return (
    <aside css={CSS} style={vis?{right: '0%'}:{right: '-20%'}}>
      <h2>Cart</h2>
      <button className="closeBtn" onClick={() => setVis(false)}>Close</button>
        { inBrowser &&
          items.map((item:iCartItem)=>
            <CartItem item={item} key={item.id} />)
        }
      <p>Subtotal {inBrowser && currency(cartTotal)}</p>
      <p>Shipping and taxes are added at checkout.</p>
      <Link href="/checkout"><a><button className="checkoutBtn" disabled={(inBrowser && isEmpty)} style={(inBrowser && isEmpty) ? {background: 'grey', cursor: 'not-allowed', color: 'white'} : {}}>Checkout</button></a></Link>
    </aside>
  )
}

export default Cart