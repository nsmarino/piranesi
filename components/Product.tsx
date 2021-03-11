/** @jsxImportSource @emotion/react */

import Image from 'next/image'
import { useState } from 'react'
import { useCart } from 'react-use-cart'
import { jsx, css } from '@emotion/react'

const Product_CSS = css`
  width:250px;
  padding: 10px;
  margin: 10px;
  border: 4px double black;
  background: #dbc7cb;

  h3 {
    margin: 0;
    font-weight: normal;
    border: 1px solid black;
  }

  .price {
    font-family: Arial;
    margin: 0;
    border: 1px solid black;
  }

  .description {
    margin: 0;
    border: 1px solid black;
  }

  .variant {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid black;
  }
  .action {
    background: black;
    color: white;
    display: block;
  }
`

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
    <section css={Product_CSS}>
      <h3>{product.cmsData.name}</h3>
        <Image 
          src={product.sync_product.thumbnail_url} 
          alt={product.sync_product.name}
          quality={100}
          width={500}
          height={500}
        /> 

      <p className="price">${variant.retail_price}</p>
      <p className="description">{product.cmsData.description}</p>
      {
        product.sync_variants.map(v => 
          <button 
            key={v.id} 
            data-size={v.variant_size}
            onClick={e=>setVariant(v)}
            className="variant"
            style={{ 
              background: `${v===variant ? 'black':'white'}`,
              color: `${v===variant ? 'white':'black'}`
            }}
          >
            {v.variant_size}
          </button>
          )
      }

      <button onClick={handleClick} className="action">Add to cart</button>
    </section>
  )
}

export default Product