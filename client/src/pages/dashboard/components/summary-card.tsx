import { Grid } from '@mui/material'
import {
  PieChart as PieChartIcon,
  AttachMoney as AttachMoneyIcon,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material'
import {
  calculateTotalAssets,
  calculateTotalValue,
  getTopAssetType,
} from '../../../utils/asset.utils'
import type { ISummaryCard } from './types'
import SummaryCardItem from './summary-card-item'

const SummaryCard = ({ assets }: ISummaryCard) => {
  const totalValue = calculateTotalValue(assets)
  const totalAssets = calculateTotalAssets(assets)
  const topAsset = getTopAssetType(assets)

  return (
    <Grid container spacing={3} mb={5} data-testid="SummaryCard">
      <SummaryCardItem
        Icon={AttachMoneyIcon}
        title="Total Balance"
        cardStyle={{
          height: '100%',
          borderRadius: 4,
          background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)',
          color: 'white',
          boxShadow: '0 8px 24px rgba(21, 101, 192, 0.2)',
        }}
        boxStyle={{
          p: 1,
          borderRadius: '12px',
          bgcolor: 'rgba(255,255,255,0.15)',
          mr: 2,
          display: 'flex',
        }}
        value={`$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
        tagline="Based on latest closing prices"
      />

      <SummaryCardItem
        Icon={AccountBalanceIcon}
        title="Total Assets"
        value={totalAssets?.toString()}
        tagline="Active positions"
      />

      <SummaryCardItem
        Icon={PieChartIcon}
        title="Top Sector"
        value={topAsset}
        tagline="Most allocated asset type"
      />
    </Grid>
  )
}

export default SummaryCard
