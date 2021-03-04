import CartItem from './CartItem'

const CheckoutSidebar:React.FC<{items:iItem[], costs: iCostDisplay}> = ({items, costs}) => {
  return (
    <aside>
      <h2>Order info:</h2>
      {items.map(item => <CartItem item={item} key={item.sync_variant_id} />)}

      <p>Subtotal {costs.subtotal}</p>
      <p>Shipping and Taxes {costs.estimates}</p>
      <p>Total {costs.total}</p>
    </aside>
  )
}

export default CheckoutSidebar