import Image from 'next/image'

const Product:React.FC<{product:iProduct}> = ({ product }) => {
  return (
    <section>
      <h2>{product.sync_product.name}</h2>
      <Image 
        src={product.sync_product.thumbnail_url} 
        alt={product.sync_product.name}
        width={250}
        height={250}
      />
    </section>
  )
}

export default Product