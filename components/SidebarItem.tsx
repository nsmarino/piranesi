import Image from "next/image"

const SidebarItem:React.FC<{ item:iCartItem }> = ({ item }) => {
  
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
        {item.quantity}
      </div>
    </div>
  )
}

export default SidebarItem