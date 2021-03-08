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
  variant_size?: string
  warehouse_product_variant_id: null
}

interface iCmsProduct {
  name: string
  description: string
  price: number
  id: number
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
  cmsData: iCmsProduct
}

// Item in cart; used in iOrder
interface iCartItem {
  name: string
  price: number
  size: string
  image: string
  id: string
  sync_variant_id: number
  product_id: number
  quantity: number
}

interface iOrderItem {
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
  items: iOrderItem[]
}

// Returned from estimate-costs and used to update costDisplay state
// Purely cosmetic. Does not affect checkout function.
interface iOrderCosts {
  costs: {
    currency: 'USD',
    subtotal: string,
    discount: string,
    shipping: string,
    digitization: string,
    additional_fee: string,
    fulfillment_fee: string,
    tax: string,
    vat: string,
    total: string
  },
}

// Displayed to user in CheckoutSidebar.tsx
interface iCostDisplay {
  subtotal: number
  estimates: number
  total: number
}

interface iConfirmation {
  success: boolean
  info: string
}

interface iEstimates {
  shipping: number
  tax: number
}

interface iDraftOrder {
  amount: number
  description: string
}
