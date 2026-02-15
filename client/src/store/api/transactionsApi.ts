import { api } from './baseApi'

export interface Transaction {
  _id: string
  asset: {
    _id: string
    name: string
    symbol: string
    type: string
  }
  type: 'BUY' | 'SELL'
  quantity: number
  pricePerUnit: number
  date: string
  createdAt: string
}

export interface TradeRequest {
  assetId: string
  type: 'BUY' | 'SELL'
  quantity: number
  pricePerUnit: number
}

export interface TransactionsResponse {
  success: boolean
  data: Transaction[]
}

export interface TransactionResponse {
  success: boolean
  data: Transaction
}

export const transactionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<TransactionsResponse, void>({
      query: () => '/transaction',
      providesTags: ['Transactions'],
    }),

    addTransaction: builder.mutation<TransactionResponse, TradeRequest>({
      query: (body) => ({
        url: '/transaction',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Transactions', 'Assets'],
    }),
  }),
})

export const { useGetTransactionsQuery, useAddTransactionMutation } =
  transactionsApi
