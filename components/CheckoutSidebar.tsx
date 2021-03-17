/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'

import SidebarItem from './SidebarItem'
import { useCart } from 'react-use-cart'
import currency from '../utils/currency'

const CSS = css`
padding: 3rem;
padding-top: 0;
width: 50%;
h3 {
  font-weight: normal;
  font-size: 150%;
  margin-top: 0;
}
.orderCosts {
  background: var(--light);
  border-radius: 10px;
  padding: 1.5rem;
}
`

interface iSidebar {
  estimates: iEstimates
}

const CheckoutSidebar:React.FC<iSidebar> = ({ estimates }) => {
  const { items, cartTotal } = useCart()

  return (
    <aside css={CSS}>
      <h3>Order Info</h3>
      {items.map((item:iCartItem) => 
        <SidebarItem 
          item={item} 
          key={item.sync_variant_id} 
        />
      )}
      <div className="orderCosts">
        <p>Subtotal {currency(cartTotal)}</p>
        <p>Shipping {currency(estimates.shipping)}</p>
        <p>Tax {currency(estimates.tax)}</p>
        <p>Total {currency(cartTotal + estimates.shipping + estimates.tax)}</p>
      </div>
    </aside>
  )
}

export default CheckoutSidebar