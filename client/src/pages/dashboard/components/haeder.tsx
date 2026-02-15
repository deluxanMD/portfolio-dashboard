import { Box, Button, Typography } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import type { IDashboardHeader } from './types'
import { useNavigate } from 'react-router-dom'

const Header = ({ setDialogOpen }: IDashboardHeader) => {
  const navigate = useNavigate()

  return (
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
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Button variant="outlined" onClick={() => navigate('/transactions')}>
          View Transactions
        </Button>
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
    </Box>
  )
}

export default Header
