/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { useCart } from 'react-use-cart'
import { useEffect, useState } from 'react'

const CSS = css`
position: fixed;
right: 0;
top: 50px;
width: 3rem;
text-align: center;
background: black;
color: white;
font-family: Arial;

:hover {
  color: var(--dark);
  background-color: var(--light);
  cursor: pointer;
}
`

const CartToggle = ({ setVis }) => {
  const { totalItems } = useCart()
  const [inBrowser, setInBrowser] = useState(false)

  // Only runs code once app has mounted to DOM in browser
  // Needed because cart information is kept in localStorage
  useEffect(() => {
    setInBrowser(true)
  },[])

  return (
    <div id='cartToggle' css={CSS} onClick={() => setVis(true)}>
      <p id='cartTotal'>{inBrowser && totalItems}</p>
      <p>Cart</p>
    </div>
)}
export default CartToggle