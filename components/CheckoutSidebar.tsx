import SidebarItem from './SidebarItem'
import { useCart } from 'react-use-cart'

interface iSidebar {
  costs: iCostDisplay
}

const CheckoutSidebar:React.FC<iSidebar> = ({ costs }) => {
  const { items } = useCart()

  return (
    <aside>
      <h2>Order info:</h2>
      {items.map((item:iCartItem) => 
        <SidebarItem 
          item={item} 
          key={item.sync_variant_id} 
        />
      )}

      <p>Subtotal {costs.subtotal}</p>
      <p>Shipping and Taxes {costs.estimates}</p>
      <p>Total {costs.total}</p>
    </aside>
  )
}

export default CheckoutSidebar