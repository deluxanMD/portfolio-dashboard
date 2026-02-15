import {
  Box,
  Chip,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  SwapHoriz as SwapIcon,
} from '@mui/icons-material'
import type { IAssetTable } from './types'
import AssetsEmpty from './assets-empty'

const AssetTableBody = ({
  assets,
  setDialogOpen,
  setIsEdit,
  setAssetId,
  setDeleteOpen,
  setDeleteId,
  handleTradeClick,
}: Partial<IAssetTable>) => {
  return (
    <TableBody>
      {assets?.data?.length === 0 && (
        <AssetsEmpty setDialogOpen={setDialogOpen} />
      )}
      {assets?.data?.map((asset) => {
        const price = asset.currentPrice || asset.purchasePrice
        const totalValue = price * asset.quantity

        return (
          <TableRow
            key={asset._id}
            hover
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              transition: 'all 0.2s',
              '&:hover': { bgcolor: '#f8fafc' },
            }}
          >
            <TableCell component="th" scope="row">
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: '#eff6ff',
                    color: '#1e40af',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    mr: 2,
                  }}
                >
                  {asset.symbol.substring(0, 1)}
                </Box>
                <Typography fontWeight="600" color="text.primary">
                  {asset.symbol}
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Typography variant="body2" fontWeight="500">
                {asset.name}
              </Typography>
            </TableCell>
            <TableCell>
              <Chip
                label={asset.type}
                size="small"
                sx={{
                  fontWeight: 500,
                  bgcolor:
                    asset.type === 'Stock'
                      ? '#e0f2fe'
                      : asset.type === 'Bond'
                        ? '#f0fdf4'
                        : '#f3f4f6',
                  color:
                    asset.type === 'Stock'
                      ? '#0369a1'
                      : asset.type === 'Bond'
                        ? '#15803d'
                        : '#374151',
                }}
              />
            </TableCell>
            <TableCell align="right" sx={{ color: 'text.secondary' }}>
              {asset.quantity.toLocaleString()}
            </TableCell>
            <TableCell align="right" sx={{ color: 'text.secondary' }}>
              ${asset.purchasePrice.toFixed(2)}
            </TableCell>
            <TableCell align="right">
              <Typography fontWeight="600" color="text.primary">
                $
                {totalValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Tooltip title="Trade">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    if (handleTradeClick) {
                      handleTradeClick(asset)
                    }
                  }}
                  sx={{ mr: 1 }}
                >
                  <SwapIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  sx={{
                    mr: 1,
                    color: '#64748b',
                    '&:hover': { color: '#1976d2' },
                  }}
                  onClick={() => {
                    if (setAssetId && setDialogOpen && setIsEdit) {
                      setAssetId(asset._id)
                      setIsEdit(true)
                      setDialogOpen(true)
                    }
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  onClick={() => {
                    if (setDeleteId && setDeleteOpen) {
                      setDeleteId(asset._id)
                      setDeleteOpen(true)
                    }
                  }}
                  sx={{
                    color: '#64748b',
                    '&:hover': { color: '#ef4444' },
                  }}
                >
                  <DeleteIcon fontSize="small" color="error" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default AssetTableBody
