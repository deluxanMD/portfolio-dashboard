import { Button, TableCell, TableRow, Typography } from '@mui/material'
import {
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material'
import type { IAssetTable } from './types'

const AssetsEmpty = ({ setDialogOpen }: Partial<IAssetTable>) => {
  return (
    <TableRow>
      <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
        <TrendingUpIcon sx={{ fontSize: 48, color: '#e2e8f0', mb: 2 }} />
        <Typography
          variant="h6"
          color="text.secondary"
          data-testid="AssetsEmpty.Title"
        >
          No assets found
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3 }}
          data-testid="AssetsEmpty.Description"
        >
          Start building your portfolio by adding an investment.
        </Typography>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => {
            if (setDialogOpen) setDialogOpen(true)
          }}
        >
          Add Investment
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default AssetsEmpty
