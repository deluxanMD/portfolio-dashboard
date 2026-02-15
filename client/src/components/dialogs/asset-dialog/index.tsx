import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { IAssetDialog } from './types'
import { FormProvider } from 'react-hook-form'
import AssetForm from '../../forms/asset-form'
import { useAssetForm } from '../../forms/asset-form/hooks'
import {
  useAddAssetMutation,
  useGetAssetQuery,
  useUpdateAssetMutation,
} from '../../../store/api/assetsApi'
import type { Asset } from '../../../store/asset/assetTypes'

const AssetDialog = ({
  isEdit,
  assetId,
  handleClose,
  ...rest
}: IAssetDialog) => {
  const { data: asset } = useGetAssetQuery(assetId)
  const [addAsset, { isLoading: isAdding, error: addError }] =
    useAddAssetMutation()
  const [updateAsset, { isLoading: isUpdating, error: updateError }] =
    useUpdateAssetMutation()

  const formMethods = useAssetForm(isEdit, asset)
  const isLoading = isAdding || isUpdating
  const error = addError || updateError
  const errorMessage =
    error && 'data' in error ? (error.data as any).message : null

  console.log(errorMessage)

  const onSubmit = async (data: Partial<Asset>) => {
    try {
      if (isEdit) {
        await updateAsset({
          id: asset?.data._id as string,
          body: data,
        }).unwrap()
      } else {
        await addAsset(data).unwrap()
      }
      handleClose()
      formMethods.reset()
    } catch (err) {
      console.error('Failed to save asset:', err)
    }
  }

  return (
    <Dialog {...rest} maxWidth="sm" open fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {isEdit ? 'Edit Investment' : 'Add Investment'}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Box component="form" onSubmit={formMethods.handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <FormProvider {...formMethods}>
            <AssetForm />
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="warning"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? (
              <CircularProgress size={24} />
            ) : isEdit ? (
              'Update'
            ) : (
              'Add Asset'
            )}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default AssetDialog
