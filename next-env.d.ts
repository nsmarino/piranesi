/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.css'

// Initial return from Printful store in 'src/datasources/getAllPrintfulProducts'
interface iProduct_NO_VARIANTS {
  id: number
}

// Used in iVariant
interface iFile {
  created: number
  dpi: number
  filename: string
  hash: string
  height: number
  id: number
  mime_type: string
  preview_url: string
  size: number
  status: string
  thumbnail_url: string
  type: string
  url: null
  visible: boolean
  width: number
}

// Used in iVariant
interface iOption {
  id: string
  value: string | []
}

// Used in iProduct
interface iVariant {
  currency: string
  external_id: string
  files: iFile[]
  id: number
  name: string
  options: iOption[]
  product: {
    image: string
    name: string
    product_id: number
    variant_id: number
  }
  retail_price: string
  sku: string
  sync_product_id: number
  synced: boolean
  variant_id: number
  warehouse_product_variant_id: null
}

// Returned from Printful
interface iProduct {
  sync_product: {
    id: number
    external_id: string
    name: string
    synced: number
    thumbnail_url: string
    variants: number
  }
  sync_variants: iVariant[]
}

// Item in cart; used in iOrder
interface iItem {
  name: string
  thumbnail_url: string
  sync_variant_id: number
  quantity: number
}

// Received from form on checkout page; used in iOrder
interface iRecipient {
  address1: string
  address2?: string
  city: string
  state_code: string
  country_code: 'US'
  name: string
  email?: string
  phone?: string
  state_code?: string
  zip: string
}

// Sent from checkout page to both estimate costs and complete checkout
interface iOrder {
  recipient: iRecipient
  items: iItem[]
}

// Returned from estimate-costs and used to update costDisplay state
// Purely cosmetic. Does not affect checkout function.
interface iOrderCosts {
  costs: {
    currency: 'USD',
    subtotal: number,
    discount: number,
    shipping: number,
    digitization: number,
    additional_fee: number,
    fulfillment_fee: number,
    tax: number,
    vat: number,
    total: number
  },
  retail_costs: {
    currency: 'USD',
    subtotal: number | null,
    discount: number | null,
    shipping: number | null,
    tax: number | null,
    vat: number | null,
    total: number | null
  } 
}

// Displayed to user in CheckoutSidebar.tsx
interface iCostDisplay {
  subtotal: number
  estimates: number
  total: number
}


