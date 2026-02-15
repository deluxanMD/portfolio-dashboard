import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, User } from './authTypes'

const storedToken = localStorage.getItem('token')
const storedRefreshToken = localStorage.getItem('refreshToken')
const storedUser = localStorage.getItem('user')

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  refreshToken: storedRefreshToken || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string; refreshToken: string }>
    ) => {
      const { user, token, refreshToken } = action.payload
      state.user = user
      state.token = token
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('user', JSON.stringify(user))
    },
    tokenUpdated: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token
      localStorage.setItem('token', action.payload.token)
    },
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    },
  },
})

export const { setCredentials, tokenUpdated, logout } = authSlice.actions
export default authSlice.reducer
