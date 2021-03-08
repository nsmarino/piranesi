import { useState, useEffect } from 'react'
import { useCart } from 'react-use-cart'
import Link from 'next/link'
import CartItem from "./CartItem"
import currency from '../utils/currency'

const Cart = () => {
  const { items, cartTotal, isEmpty } = useCart()
  const [inBrowser, setInBrowser] = useState(false)

  // Only runs code once app has mounted to DOM in browser
  // Needed because cart information is kept in localStorage
  useEffect(() => {
    setInBrowser(true)
  },[])

  return (
    <aside>
      <h2>Cart</h2>
        { inBrowser &&
          items.map((item:iCartItem)=>
            <CartItem item={item} key={item.id} />)
        }
      <p>Subtotal {inBrowser && currency(cartTotal)}</p>
      <p>Shipping and taxes are added at checkout.</p>
      <Link href="/checkout"><a><button disabled={(inBrowser && isEmpty)}>Checkout</button></a></Link>
    </aside>
  )
}

export default Cart