import { useState } from 'react'
import { Box, CircularProgress, Alert } from '@mui/material'
import {
  useDeleteAssetMutation,
  useGetAssetsQuery,
} from '../../store/api/assetsApi'
import AssetDialog from '../../components/dialogs/asset-dialog'
import AssetDeleteDialog from '../../components/dialogs/asset-delete-dialog'
import Header from './components/haeder'
import SummaryCard from './components/summary-card'
import AssetTable from './components/asset-table'
import TransactionDialog from '../../components/dialogs/transaction-dialog'
import type { Asset } from '../../store/asset/assetTypes'

const DashboardPage = () => {
  const { data: assets, isLoading, error } = useGetAssetsQuery()
  const [deleteAsset, { isLoading: isDeleteLoading }] = useDeleteAssetMutation()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [assetId, setAssetId] = useState('')
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<string>('')

  // Transaction Dialog State
  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false)
  const [assetToTrade, setAssetToTrade] = useState<Asset | null>(null)

  const handleTradeClick = (asset: Asset) => {
    setAssetToTrade(asset)
    setIsTradeDialogOpen(true)
  }

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
        <Header setDialogOpen={setDialogOpen} />
        {assets && <SummaryCard assets={assets} />}
        {assets && (
          <AssetTable
            assets={assets}
            setAssetId={setAssetId}
            setDeleteOpen={setDeleteOpen}
            setDialogOpen={setDialogOpen}
            setIsEdit={setIsEdit}
            setDeleteId={setDeleteId}
            handleTradeClick={handleTradeClick}
          />
        )}
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

      {assetToTrade && (
        <TransactionDialog
          open={isTradeDialogOpen}
          onClose={() => {
            setIsTradeDialogOpen(false)
            setAssetToTrade(null)
          }}
          asset={assetToTrade}
          assetId={assetToTrade._id}
          handleClose={() => {
            setIsTradeDialogOpen(false)
            setAssetToTrade(null)
          }}
        />
      )}
    </>
  )
}

export default DashboardPage
