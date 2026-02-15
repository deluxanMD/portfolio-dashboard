import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthState } from './authTypes'

const storedToken = localStorage.getItem('token')
const storedRefreshToken = localStorage.getItem('refreshToken')

const initialState: AuthState = {
  token: storedToken || null,
  refreshToken: storedRefreshToken || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) => {
      const { token, refreshToken } = action.payload
      state.token = token
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
    },
    tokenUpdated: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token
      localStorage.setItem('token', action.payload.token)
    },
    logout: (state) => {
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    },
  },
})

export const { setCredentials, tokenUpdated, logout } = authSlice.actions
export default authSlice.reducer
