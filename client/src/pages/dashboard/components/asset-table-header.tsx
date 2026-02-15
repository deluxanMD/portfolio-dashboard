import { TableCell, TableHead, TableRow } from '@mui/material'

const AssetTableHeader = () => {
  return (
    <TableHead sx={{ bgcolor: '#f8fafc' }}>
      <TableRow>
        <TableCell sx={{ fontWeight: '600', color: '#64748b', py: 2 }}>
          SYMBOL
        </TableCell>
        <TableCell sx={{ fontWeight: '600', color: '#64748b', py: 2 }}>
          NAME
        </TableCell>
        <TableCell sx={{ fontWeight: '600', color: '#64748b', py: 2 }}>
          TYPE
        </TableCell>
        <TableCell
          align="right"
          sx={{ fontWeight: '600', color: '#64748b', py: 2 }}
        >
          QUANTITY
        </TableCell>
        <TableCell
          align="right"
          sx={{ fontWeight: '600', color: '#64748b', py: 2 }}
        >
          AVG. PRICE
        </TableCell>
        <TableCell
          align="right"
          sx={{ fontWeight: '600', color: '#64748b', py: 2 }}
        >
          VALUE
        </TableCell>
        <TableCell
          align="center"
          sx={{ fontWeight: '600', color: '#64748b', py: 2 }}
        >
          ACTIONS
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export default AssetTableHeader
