/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.css'

interface iProduct_NO_VARIANTS {
  id: number
}

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

interface iOption {
  id: string
  value: string | []
}

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

interface iItem {
  name: string
  thumbnail_url: string
  sync_variant_id: number
  quantity: number
}

interface iOrder {
  recipient: {
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
  items: iItem[]
}

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

interface iDraft {
  
}


