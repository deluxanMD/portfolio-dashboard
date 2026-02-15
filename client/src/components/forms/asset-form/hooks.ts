import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { assetSchema } from './schema'
import { useEffect } from 'react'
import type { AssetResponse } from '../../../store/asset/assetTypes'

export const useAssetForm = (
  isEdit: boolean = false,
  assetData?: AssetResponse
) => {
  console.log(assetData)
  const form = useForm({
    resolver: yupResolver(assetSchema),
  })

  useEffect(() => {
    if (isEdit) {
      form.setValue('name', assetData?.data.name || '')
      form.setValue('symbol', assetData?.data.symbol || '')
      form.setValue('type', assetData?.data.type || 'Stock')
      form.setValue('quantity', assetData?.data.quantity || 0)
      form.setValue('purchasePrice', assetData?.data.purchasePrice || 0)
    } else {
      form.reset()
    }
  }, [assetData, form, isEdit])

  return form
}
