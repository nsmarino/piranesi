/** @jsxImportSource @emotion/react */

import Image from 'next/image'
import { useState } from 'react'
import { useCart } from 'react-use-cart'
import { jsx, css } from '@emotion/react'

import { under992 } from '../styles/mediaQueries'

const Product_CSS = css`
flex: 0 0 100%;
padding: 2rem;
border-bottom: 4px solid black;
display: flex;
${under992} {
  flex-direction: column;
}
.text {
  flex: 0 0 50%;
}
h3 {
  font-family: Megalith;
  font-weight: normal;
  font-size: 600%;
  margin: 0;
}
.imgCon {
  background: white;
}
.description {
  font-family: Megalith;
  font-size: 300%;
  color: grey;
  margin: 0;
}
.price {
  font-family: Arial;
  font-size: 150%;
  color: grey;
}
.variant {
  width: 3rem;
  height: 3rem;
  margin-right: 0.5rem;
  border: 2px solid var(--dark);
  text-transform: lowercase;
  font-family: Arial;
  :hover {
    border: 2px solid var(--light);
  }
}
.addBtn {
  display: block;
  height: 3rem;
  margin-top: 1rem;
  background: var(--dark);
  color: white;
  font-weight: bold;
  border: none;
  :hover {
    color: black;
    background: var(--light);
  }
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
      <div className="text">
        <h3>{product.cmsData.name}</h3>
        <p className="description">{product.cmsData.description}</p>
        <p className="price">${variant.retail_price}</p>
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
      <button onClick={handleClick} className="addBtn">Add to cart</button>

      </div>

      <div className="interface">
        <div className="imgCon">
        <Image 
          src={product.sync_product.thumbnail_url} 
          alt={product.sync_product.name}
          quality={100}
          width={500}
          height={500}
        />
        </div>
     
      </div>
    </section>
  )
}

export default Product