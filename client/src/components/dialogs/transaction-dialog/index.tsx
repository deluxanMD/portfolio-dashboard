import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  Typography,
} from '@mui/material'
import { FormProvider } from 'react-hook-form'
import { useGetAssetQuery } from '../../../store/api/assetsApi'
import TransactionForm from '../../forms/transaction-form'
import { useTransactionform } from '../../forms/transaction-form/hooks'
import type { ITransactionDialog } from './types'
import {
  useAddTransactionMutation,
  type Transaction,
} from '../../../store/api/transactionsApi'

const TransactionDialog = ({
  assetId,
  handleClose,
  ...rest
}: ITransactionDialog) => {
  const { data: asset } = useGetAssetQuery(assetId)
  const [addTransaction, { isLoading, error }] = useAddTransactionMutation()

  const formMethods = useTransactionform()

  const quantity = asset?.data?.quantity
  const price = asset?.data?.purchasePrice
  const type = asset?.data?.type as 'BUY' | 'SELL'
  const totalValue = (quantity || 0) * (price || 0)

  const errorMessage = (error as any)?.data?.error?.message

  const onSubmit = async (data: Partial<Transaction>) => {
    if (!asset) return
    try {
      await addTransaction({
        assetId: asset.data._id,
        pricePerUnit: Number(data.pricePerUnit),
        quantity: Number(data.quantity),
        type: data.type || 'BUY',
      }).unwrap()
      handleClose()
      formMethods.reset()
    } catch (err) {
      console.error('Failed to trade:', err)
    }
  }

  if (error) {
    return (
      <Snackbar open autoHideDuration={6000}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    )
  }

  return (
    <Dialog {...rest} maxWidth="sm" open fullWidth>
      <DialogTitle>
        Trade {asset?.data?.symbol}
        <Typography variant="body2" color="text.secondary">
          {asset?.data?.name}
        </Typography>
      </DialogTitle>
      <Box component="form" onSubmit={formMethods.handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <FormProvider {...formMethods}>
            <TransactionForm />
          </FormProvider>

          <Grid>
            <Box
              sx={{
                bgcolor: type === 'BUY' ? '#e8f5e9' : '#ffebee',
                p: 2,
                borderRadius: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Total Value
              </Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                color={type === 'BUY' ? 'success.main' : 'error.main'}
              >
                $
                {totalValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </Typography>
            </Box>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color={type === 'BUY' ? 'success' : 'error'}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : `Confirm ${type}`}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default TransactionDialog
