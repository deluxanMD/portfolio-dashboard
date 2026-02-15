import { useState } from 'react'
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  TrendingUp as TrendingUpIcon,
  PieChart as PieChartIcon,
  AttachMoney as AttachMoneyIcon,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material'
import {
  useDeleteAssetMutation,
  useGetAssetsQuery,
} from '../../store/api/assetsApi'
import AssetDialog from '../../components/dialogs/asset-dialog'
import AssetDeleteDialog from '../../components/dialogs/asset-delete-dialog'

const DashboardPage = () => {
  const { data: assets, isLoading, error } = useGetAssetsQuery()
  const [deleteAsset, { isLoading: isDeleteLoading }] = useDeleteAssetMutation()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [assetId, setAssetId] = useState('')
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<string>('')

  const handleDelete = async (id: string) => {
    try {
      await deleteAsset(id).unwrap()
    } catch (err) {
      console.error('Failed to delete asset:', err)
    } finally {
      setDeleteId('')
      setDeleteOpen(false)
    }
  }

  const calculateTotalValue = () => {
    if (!assets) return 0
    return assets.data.reduce((total, asset) => {
      const price = asset.currentPrice || asset.purchasePrice
      return total + price * asset.quantity
    }, 0)
  }

  const calculateTotalAssets = () => assets?.data?.length || 0

  const getTopAssetType = () => {
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

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    )

  if (error)
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Failed to load assets. Please check your connection.
      </Alert>
    )

  return (
    <>
      <Box sx={{ p: 4, minHeight: '100vh' }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Box>
            <Typography variant="h4" fontWeight="800" color="text.primary">
              Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
              Overview of your investment portfolio
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setDialogOpen(true)}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              py: 1,
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
            }}
          >
            Add Investment
          </Button>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={3} mb={5}>
          <Grid>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 4,
                background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)',
                color: 'white',
                boxShadow: '0 8px 24px rgba(21, 101, 192, 0.2)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: '12px',
                      bgcolor: 'rgba(255,255,255,0.15)',
                      mr: 2,
                      display: 'flex',
                    }}
                  >
                    <AttachMoneyIcon />
                  </Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight="500"
                    sx={{ opacity: 0.9 }}
                  >
                    Total Balance
                  </Typography>
                </Box>
                <Typography variant="h3" fontWeight="bold">
                  $
                  {calculateTotalValue().toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.8, mt: 1, display: 'block' }}
                >
                  Based on latest closing prices
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 4,
                border: '1px solid #edf2f7',
                bgcolor: 'white',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: '12px',
                      bgcolor: '#e3f2fd',
                      color: '#1976d2',
                      mr: 2,
                      display: 'flex',
                    }}
                  >
                    <AccountBalanceIcon />
                  </Box>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    fontWeight="500"
                  >
                    Total Assets
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold" color="text.primary">
                  {calculateTotalAssets()}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Active positions
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 4,
                border: '1px solid #edf2f7',
                bgcolor: 'white',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: '12px',
                      bgcolor: '#e8f5e9',
                      color: '#2e7d32',
                      mr: 2,
                      display: 'flex',
                    }}
                  >
                    <PieChartIcon />
                  </Box>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    fontWeight="500"
                  >
                    Top Sector
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold" color="text.primary">
                  {getTopAssetType()}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Most allocated asset type
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Assets Table */}
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

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            border: '1px solid #e0e0e0',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="portfolio table">
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: '600', color: '#64748b', py: 2 }}>
                  SYMBOL
                </TableCell>
                <TableCell sx={{ fontWeight: '600', color: '#64748b', py: 2 }}>
                  NAME
                </TableCell>
                <TableCell sx={{ fontWeight: '600', color: '#64748b', py: 2 }}>
                  TYPE
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: '600', color: '#64748b', py: 2 }}
                >
                  QUANTITY
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: '600', color: '#64748b', py: 2 }}
                >
                  AVG. PRICE
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: '600', color: '#64748b', py: 2 }}
                >
                  VALUE
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: '600', color: '#64748b', py: 2 }}
                >
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets?.data?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                    <TrendingUpIcon
                      sx={{ fontSize: 48, color: '#e2e8f0', mb: 2 }}
                    />
                    <Typography variant="h6" color="text.secondary">
                      No assets found
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      Start building your portfolio by adding an investment.
                    </Typography>
                    <Button variant="outlined" startIcon={<AddIcon />}>
                      Add Investment
                    </Button>
                  </TableCell>
                </TableRow>
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
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          sx={{
                            mr: 1,
                            color: '#64748b',
                            '&:hover': { color: '#1976d2' },
                          }}
                          onClick={() => {
                            setAssetId(asset._id)
                            setIsEdit(true)
                            setDialogOpen(true)
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setDeleteId(asset._id)
                            setDeleteOpen(true)
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
          </Table>
        </TableContainer>
      </Box>
      {dialogOpen && (
        <AssetDialog
          isEdit={isEdit}
          assetId={assetId}
          open={dialogOpen}
          handleClose={() => {
            setDialogOpen(false)
            setIsEdit(false)
          }}
        />
      )}
      {deleteOpen && (
        <AssetDeleteDialog
          open={deleteOpen}
          assetId={deleteId}
          isLoading={isDeleteLoading}
          handleDelete={handleDelete}
          handleClose={() => {
            setDeleteOpen(false)
          }}
        />
      )}
    </>
  )
}

export default DashboardPage
