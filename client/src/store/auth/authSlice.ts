import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthState } from './authTypes'

const storedToken = localStorage.getItem('token')

const initialState: AuthState = {
  token: storedToken || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload
      state.token = token
      localStorage.setItem('token', token)
    },
    logout: (state) => {
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
