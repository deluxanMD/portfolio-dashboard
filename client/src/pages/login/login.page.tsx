import { FormProvider } from 'react-hook-form'
import { Box, Container, Typography, Paper, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../store/api/authApi'
import { setCredentials } from '../../store/auth/authSlice'
import { useAppDispatch } from '../../store/hooks'
import { useLoginForm } from '../../components/forms/login-form/hooks'
import LoginForm from '../../components/forms/login-form'
import type { IAuthInput } from '../../components/forms/login-form/types'
import { useState } from 'react'
import type { AuthErrorResponse } from '../../store/auth/authTypes'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login, { isLoading, error }] = useLoginMutation()
  const formMethods = useLoginForm()
  const [errorAlert, setErrorAlert] = useState('')

  const onSubmit = async (data: IAuthInput) => {
    try {
      const result = await login(data).unwrap()
      console.log(result)
      dispatch(
        setCredentials({
          user: { userId: 'temp-id', username: result.username },
          token: result.token,
        })
      )
      navigate('/')
    } catch (_err: unknown) {
      const err = _err as AuthErrorResponse
      setErrorAlert(err.data.error.message || 'An error occurred')
      console.error('Failed to login:', _err)
    }
  }

  const errorMessage =
    error && 'data' in error
      ? (error.data as { message: string }).message
      : null

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Login User
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          {errorAlert && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorAlert}
            </Alert>
          )}

          <Box component="form" onSubmit={formMethods.handleSubmit(onSubmit)}>
            <FormProvider {...formMethods}>
              <LoginForm isLoading={isLoading} mode="login" />
            </FormProvider>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default LoginPage
