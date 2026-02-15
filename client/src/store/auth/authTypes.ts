export interface User {
  userId: string
  username: string
}

export interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
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
