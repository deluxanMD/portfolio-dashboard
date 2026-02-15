import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { transactionSchema } from './schema'

export const useTransactionform = () => {
  const form = useForm({
    resolver: yupResolver(transactionSchema),
  })

  return form
}
