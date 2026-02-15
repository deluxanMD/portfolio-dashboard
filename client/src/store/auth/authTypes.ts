export interface User {
  userId: string
  username: string
}

export interface AuthState {
  token: string | null
  refreshToken: string | null
}

export type LoginResponse = {
  success: boolean
  data: {
    token: string
    refreshToken: string
    username: string
  }
}

export type AuthErrorResponse = {
  status: number
  data: {
    success: boolean
    error: {
      code: number
      message: string
    }
  }
}
