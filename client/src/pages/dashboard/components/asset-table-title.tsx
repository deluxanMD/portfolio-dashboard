import { Box, Chip, Typography } from '@mui/material'
import type { IAssetTable } from './types'

const AssetTableTitle = ({ assets }: Partial<IAssetTable>) => {
  return (
    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
      <Typography variant="h6" fontWeight="bold" color="text.primary">
        Your Portfolio
      </Typography>
      <Chip
        label={`${assets?.data?.length || 0} items`}
        size="small"
        sx={{ ml: 2, bgcolor: '#f1f5f9', fontWeight: 600 }}
      />
    </Box>
  )
}

export default AssetTableTitle
