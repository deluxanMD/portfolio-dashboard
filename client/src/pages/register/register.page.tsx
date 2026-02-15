import { FormProvider } from 'react-hook-form'
import { Box, Container, Typography, Paper, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../store/api/authApi'
import { useLoginForm } from '../../components/forms/login-form/hooks'
import LoginForm from '../../components/forms/login-form'
import type { IAuthInput } from '../../components/forms/login-form/types'
import type { AuthErrorResponse } from '../../store/auth/authTypes'
import { useState } from 'react'

const LoginPage = () => {
  const navigate = useNavigate()
  const [register, { isLoading, error }] = useRegisterMutation()
  const formMethods = useLoginForm()
  const [errorAlert, setErrorAlert] = useState('')

  const onSubmit = async (data: IAuthInput) => {
    try {
      await register({
        username: data.username,
        password: data.password,
      }).unwrap()
      navigate('/login')
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
            Create User
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
              <LoginForm isLoading={isLoading} mode="register" />
            </FormProvider>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default LoginPage
