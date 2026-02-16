import { Box, Card, CardContent, Typography } from '@mui/material'
import type { ISummaryCardItem } from './types'

const SummaryCardItem = ({
  Icon,
  title,
  value,
  tagline,
  cardStyle,
  boxStyle,
}: ISummaryCardItem) => {
  return (
    <Card
      elevation={0}
      sx={
        cardStyle ?? {
          height: '100%',
          borderRadius: 4,
          border: '1px solid #edf2f7',
          bgcolor: 'white',
        }
      }
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Box
            sx={
              boxStyle ?? {
                p: 1,
                borderRadius: '12px',
                bgcolor: '#e3f2fd',
                color: '#1976d2',
                mr: 2,
                display: 'flex',
              }
            }
          >
            <Icon />
          </Box>
          <Typography
            variant="subtitle1"
            fontWeight="500"
            sx={{ opacity: 0.9 }}
            data-testid="SummaryCardItem.Title"
          >
            {title}
          </Typography>
        </Box>
        <Typography
          variant="h3"
          fontWeight="bold"
          data-testid="SummaryCardItem.Value"
        >
          {value}
        </Typography>
        <Typography
          variant="caption"
          sx={{ opacity: 0.8, mt: 1, display: 'block' }}
          data-testid="SummaryCardItem.Tagline"
        >
          {tagline}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default SummaryCardItem
