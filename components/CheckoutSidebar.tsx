import SidebarItem from './SidebarItem'
import { useCart } from 'react-use-cart'
import currency from '../utils/currency'

interface iSidebar {
  estimates: iEstimates
}

const CheckoutSidebar:React.FC<iSidebar> = ({ estimates }) => {
  const { items, cartTotal } = useCart()

  return (
    <aside>
      <h2>Order info:</h2>
      {items.map((item:iCartItem) => 
        <SidebarItem 
          item={item} 
          key={item.sync_variant_id} 
        />
      )}

      <p>Subtotal {currency(cartTotal)}</p>
      <p>Shipping {currency(estimates.shipping)}</p>
      <p>Tax {currency(estimates.tax)}</p>
      <p>Total {currency(cartTotal + estimates.shipping + estimates.tax)}</p>
    </aside>
  )
}

export default CheckoutSidebar