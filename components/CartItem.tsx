import Image from "next/image"

const CartItem:React.FC<{ item:iItem }> = ({ item }) => {
  return (
    <div>
      <p>{item.name}</p>
      <Image
        src={item.thumbnail_url}
        alt={item.name}
        width={50}
        height={50}
      />
      <p>Quantity: {item.quantity}</p>
    </div>
  )
}

export default CartItem