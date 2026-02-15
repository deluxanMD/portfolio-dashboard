export type AssetType = 'Stock' | 'Bond' | 'Mutual Fund' | 'ETF' | 'Real Estate'

export interface Asset {
  _id: string
  name: string
  symbol: string
  type: AssetType
  quantity: number
  purchasePrice: number
  currentPrice?: number
  value?: number
}

export interface AssetsResponse {
  success: boolean
  data: Asset[]
}

export interface AssetResponse {
  success: boolean
  data: Asset
}
