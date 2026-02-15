import { Box, Stack } from '@mui/material'
import PFTextField from '../../fields/portfolio-text-field'
import PFAutocompleteField, {
  type Option,
} from '../../fields/portfolio-autocomplete-field'

const types: Option[] = [
  { id: 'Stock', label: 'Stock' },
  { id: 'Bond', label: 'Bond' },
  { id: 'Mutual Fund', label: 'Mutual Fund' },
  { id: 'ETF', label: 'ETF' },
  { id: 'Real Estate', label: 'Real Estate' },
]

const AssetForm = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction={'row'} gap={2} sx={{ mb: 2 }}>
        <PFTextField name="name" label="Asset Name" sx={{ flex: 2 }} />
      </Stack>

      <Stack sx={{ mb: 2 }}>
        <PFAutocompleteField name="type" label="Type" options={types} />
      </Stack>

      <Stack direction={'row'} gap={2}>
        <PFTextField name="symbol" label="Symbol" sx={{ flex: 1 }} />
        <PFTextField
          name="quantity"
          label="Quantity"
          type="number"
          sx={{ flex: 1 }}
        />
        <PFTextField
          name="purchasePrice"
          label="Purchase Price"
          type="number"
          sx={{ flex: 1 }}
        />
      </Stack>
    </Box>
  )
}

export default AssetForm
