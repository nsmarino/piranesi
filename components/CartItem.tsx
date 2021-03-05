import Image from "next/image"
import { useCart } from 'react-use-cart'

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
    <div>
      <p>{item.name}</p>
      <Image
        src={item.image}
        alt={item.name}
        width={50}
        height={50}
      />
      <p>{item.size}</p>
      <p>${item.price}.00</p>
      <div>
        <button onClick={handleMinus}>-</button>
        {item.quantity}
        <button onClick={handlePlus}>+</button>
      </div>
    </div>
  )
}

export default CartItem