import { useState, useEffect } from 'react'
import { useCart } from 'react-use-cart'
import Link from 'next/link'
import CartItem from "./CartItem"

const Cart = () => {
  const { items, cartTotal } = useCart()
  const [inBrowser, setInBrowser] = useState(false)

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
      <p>Subtotal ${inBrowser && cartTotal}.00</p>
      <p>Shipping and taxes are added at checkout.</p>
      <Link href="/checkout"><a><button>Checkout</button></a></Link>
    </aside>
  )
}

export default Cart