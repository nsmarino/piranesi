/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { useCart } from 'react-use-cart'

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
  return (
    <div css={CSS} onClick={() => setVis(true)}>
      <p>{totalItems}</p>
      <p>Cart</p>
    </div>
)}
export default CartToggle