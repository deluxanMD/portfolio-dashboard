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
    </>
  )
}

export default DashboardPage
