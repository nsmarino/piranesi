import Image from 'next/image'
import { useState } from 'react'
import { useCart } from 'react-use-cart'

const Product:React.FC<{product:iProduct}> = ({ product }) => {
  const { addItem } = useCart()

  const handleClick = () => {
    const cartItem:iCartItem = {
      name: product.sync_product.name,
      id: variant.external_id,
      price: parseInt(variant.retail_price,10),
      size: variant.variant_size,
      quantity: 1,
      image: product.sync_product.thumbnail_url,
      sync_variant_id: variant.sync_product_id,
    }
    addItem(cartItem,1)
  }
  const [variant, setVariant] = useState(product.sync_variants[0])

  return (
    <section style={{border: '2px solid purple', margin: '1rem'}}>
      <h2>{product.sync_product.name}</h2>
      <Image 
        src={product.sync_product.thumbnail_url} 
        alt={product.sync_product.name}
        quality={100}
        width={500}
        height={500}
      />
      <p>${variant.retail_price}</p>
      {product.sync_variants.map(variant => 
      <button 
        key={variant.id} 
        data-size={variant.variant_size}
        onClick={e=>setVariant(variant)}
      >{variant.variant_size}</button>)}
      <button onClick={handleClick}>Add to cart</button>
    </section>
  )
}

export default Product