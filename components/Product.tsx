import Image from 'next/image'
import { useState } from 'react'
import { useCart } from 'react-use-cart'

const Product:React.FC<{product:iProduct}> = ({ product }) => {
  const { addItem } = useCart()
  const [variant, setVariant] = useState(product.sync_variants[0])

  const handleClick = () => {
    const cartItem:iCartItem = {
      name: product.cmsData.name,
      id: variant.external_id,
      price: parseInt(variant.retail_price,10),
      size: variant.variant_size,
      quantity: 1,
      image: product.sync_product.thumbnail_url,
      sync_variant_id: variant.id,
      product_id: product.sync_product.id
    }
    addItem(cartItem,1)
  }

  return (
    <section style={{border: '2px solid purple', margin: '1rem'}}>
      <h2>{product.cmsData.name}</h2>
      <Image 
        src={product.sync_product.thumbnail_url} 
        alt={product.sync_product.name}
        quality={100}
        width={500}
        height={500}
      />
      <p>{product.cmsData.description}</p>
      <p>${variant.retail_price}</p>

      { // Buttons for different product sizes
        product.sync_variants.map(v => 
          <button 
            key={v.id} 
            data-size={v.variant_size}
            onClick={e=>setVariant(v)}
            style={{ 
              color: `${v===variant ? 'red':'black'}`
            }}
          >
            {v.variant_size}
          </button>
          )
      }

      <button onClick={handleClick}>Add to cart</button>
    </section>
  )
}

export default Product