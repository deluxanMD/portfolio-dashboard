import type { SxProps, Theme } from '@mui/material'
import type { AssetsResponse } from '../../../store/asset/assetTypes'

export interface IDashboardHeader {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ISummaryCard {
  assets: AssetsResponse
}

export interface IAssetTable {
  assets: AssetsResponse
  setAssetId: React.Dispatch<React.SetStateAction<string>>
  setDeleteId: React.Dispatch<React.SetStateAction<string>>
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ISummaryCardItem {
  Icon: React.ElementType
  title: string
  value: string
  tagline: string
  cardStyle?: SxProps<Theme>
  boxStyle?: SxProps<Theme>
}
