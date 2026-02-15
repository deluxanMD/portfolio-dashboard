import type { DialogProps } from '@mui/material'
import type { Asset } from '../../../store/asset/assetTypes'

export interface ITransactionDialog extends DialogProps {
  asset: Asset
  handleClose: () => void
  assetId: string
}
