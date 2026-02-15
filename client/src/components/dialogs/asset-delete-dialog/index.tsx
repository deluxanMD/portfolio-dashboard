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
import type { IAssetDeleteDialog } from './types'

const AssetDeleteDialog = ({
  assetId,
  isLoading,
  handleClose,
  handleDelete,
  ...rest
}: IAssetDeleteDialog) => {
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
          Delete Investment
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        Are you sure to delete the investment
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="error"
          disabled={isLoading}
          onClick={() => handleDelete(assetId)}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Delete Investment'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AssetDeleteDialog
