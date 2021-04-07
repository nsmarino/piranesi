/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'

import Image from "next/image"
import { useCart } from 'react-use-cart'
import currency from '../utils/currency'

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
.quantityModifier {
  background: white;
  width: fit-content;
  button {
    color: white;
    width:1.5rem;
    height: 1.5rem;
    background: black;
    font-family: Arial;
    font-weight: bold;
    border: var(--light);
    :hover {
      background: var(--light);
      color: black;
    }
  }
  span {
    padding: 0.5rem;  
  }
}
`

const CartItem:React.FC<{ item:iCartItem }> = ({ item }) => {
  const { updateItemQuantity, removeItem } = useCart()
  
  const handleMinus = () => {
    if (item.quantity===1) removeItem(item.id)
    else updateItemQuantity(item.id, item.quantity-1)  
  }
  const handlePlus = () => {
    updateItemQuantity(item.id, item.quantity+1)
  }
  return (
    <div css={CSS}>
      <div className="imgCon">
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
      <p>{currency(item.price)}</p>
      <div className="quantityModifier">
        <button onClick={handleMinus}>-</button>
        <span>{item.quantity}</span>
        <button onClick={handlePlus}>+</button>
        </div>

      </div>
    </div>
  )
}

export default CartItem