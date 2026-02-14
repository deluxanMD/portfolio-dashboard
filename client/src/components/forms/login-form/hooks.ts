import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from './schema'

export const useLoginForm = () => {
  return useForm({
    resolver: yupResolver(loginSchema),
  })
}
