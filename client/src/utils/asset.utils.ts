import type { AssetsResponse } from '../store/asset/assetTypes'

export const calculateTotalValue = (assets: AssetsResponse) => {
  if (!assets) return 0
  return assets.data.reduce((total, asset) => {
    const price = asset.currentPrice || asset.purchasePrice
    return total + price * asset.quantity
  }, 0)
}

export const calculateTotalAssets = (assets: AssetsResponse) =>
  assets?.data?.length || 0

export const getTopAssetType = (assets: AssetsResponse) => {
  if (!assets || assets.data.length === 0) return 'N/A'
  const types: Record<string, number> = {}
  assets.data.forEach((a) => {
    types[a.type] = (types[a.type] || 0) + 1
  })
  const topType = Object.keys(types).reduce((a, b) =>
    types[a] > types[b] ? a : b
  )
  return topType
}
