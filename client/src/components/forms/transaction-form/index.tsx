import { Box, Stack } from '@mui/material'
import PFTextField from '../../fields/portfolio-text-field'
import type { Option } from '../../fields/portfolio-autocomplete-field'
import PFAutocompleteField from '../../fields/portfolio-autocomplete-field'

const types: Option[] = [
  { id: 'BUY', label: 'Buy' },
  { id: 'SELL', label: 'Sell' },
]

const TransactionForm = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction={'row'} gap={2} sx={{ mb: 2 }}>
        <PFAutocompleteField
          name="type"
          label="Type"
          options={types}
          sx={{ flex: 1 }}
        />
        <PFTextField
          name="quantity"
          label="Quantity"
          type="number"
          sx={{ flex: 1 }}
        />
        <PFTextField
          name="pricePerUnit"
          label="Price Per Unit"
          type="number"
          sx={{ flex: 1 }}
        />
      </Stack>
    </Box>
  )
}

export default TransactionForm
