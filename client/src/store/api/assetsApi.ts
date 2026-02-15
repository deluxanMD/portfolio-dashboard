import { api } from './baseApi'
import type { Asset, AssetResponse, AssetsResponse } from '../asset/assetTypes'

export const assetsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query<AssetsResponse, void>({
      query: () => '/assets',
      providesTags: ['Assets'],
    }),

    getAsset: builder.query<AssetResponse, string>({
      query: (id) => `/assets/${id}`,
      providesTags: ['Assets'],
    }),

    addAsset: builder.mutation<AssetResponse, Partial<Asset>>({
      query: (body) => ({
        url: '/assets',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Assets'],
    }),

    updateAsset: builder.mutation<
      AssetResponse,
      { id: string; body: Partial<Asset> }
    >({
      query: ({ id, body }) => ({
        url: `/assets/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Assets'],
    }),

    deleteAsset: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/assets/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Assets'],
    }),
  }),
})

export const {
  useGetAssetsQuery,
  useGetAssetQuery,
  useAddAssetMutation,
  useUpdateAssetMutation,
  useDeleteAssetMutation,
} = assetsApi
