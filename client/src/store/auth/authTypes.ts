export interface User {
  userId: string
  username: string
}

export interface AuthState {
  user: User | null
  token: string | null
}
