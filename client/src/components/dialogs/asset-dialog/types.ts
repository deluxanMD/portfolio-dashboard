import type { DialogProps } from '@mui/material'

export interface IAssetDialog extends DialogProps {
  isEdit: boolean
  handleClose: () => void
  assetId: string
}
