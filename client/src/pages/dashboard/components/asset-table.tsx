import { Paper, Table, TableContainer } from '@mui/material'
import AssetTableTitle from './asset-table-title'
import AssetTableHeader from './asset-table-header'
import AssetTableBody from './asset-table-body'
import type { IAssetTable } from './types'

const AssetTable = ({ ...rest }: Partial<IAssetTable>) => {
  return (
    <>
      <AssetTableTitle assets={rest.assets} data-testid="AssetTable.Title" />
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="portfolio table">
          <AssetTableHeader />
          <AssetTableBody {...rest} />
        </Table>
      </TableContainer>
    </>
  )
}

export default AssetTable
