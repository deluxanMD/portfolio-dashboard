import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  Container,
  Button,
} from '@mui/material'
import dayjs from 'dayjs'
import { useGetTransactionsQuery } from '../../store/api/transactionsApi'
import { useNavigate } from 'react-router-dom'

const TransactionHistoryPage = () => {
  const { data: transactions, isLoading, error } = useGetTransactionsQuery()

  console.log('error', error)

  const navigate = useNavigate()

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    )
  if (error) return <Alert severity="error">Failed to load history</Alert>

  return (
    <Container maxWidth="lg" sx={{ pt: 4, minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        Transaction History
      </Typography>

      <Button
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
        onClick={() => navigate('/')}
      >
        Dashboard
      </Button>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}
      >
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Asset</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Quantity
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Price
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
            {transactions?.data?.map((tx) => (
              <TableRow key={tx._id} hover>
                <TableCell>
                  {dayjs(tx.date).format('MMM D, YYYY h:mm A')}
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      {tx.asset?.symbol}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {tx.asset?.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={tx.type}
                    size="small"
                    color={tx.type === 'BUY' ? 'success' : 'error'}
                    variant="outlined"
                    sx={{ fontWeight: 'bold' }}
                  />
                </TableCell>
                <TableCell align="right">{tx.quantity}</TableCell>
                <TableCell align="right">
                  ${tx.pricePerUnit.toFixed(2)}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  ${(tx.quantity * tx.pricePerUnit).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default TransactionHistoryPage
