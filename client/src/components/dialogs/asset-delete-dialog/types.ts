import type { DialogProps } from '@mui/material'

export interface IAssetDeleteDialog extends DialogProps {
  assetId: string
  isLoading: boolean
  handleClose: () => void
  handleDelete: (id: string) => Promise<void>
}
