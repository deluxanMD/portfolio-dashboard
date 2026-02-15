export interface ILoginForm {
  isLoading: boolean
  mode: 'login' | 'register'
}

export interface IAuthInput {
  username: string
  password: string
}
