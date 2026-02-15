import type { IAuthInput } from '../../components/forms/login-form/types'
import type { LoginResponse } from '../auth/authTypes'
import { api } from './baseApi'

export interface User {
  userId: string
  username: string
}

export interface AuthResponse {
  token: string
  username: string
}

export interface RegisterResponse {
  message: string
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, IAuthInput>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    register: builder.mutation<RegisterResponse, IAuthInput>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi
