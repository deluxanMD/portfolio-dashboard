import { Link } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import PFTextField from '../../fields/portfolio-text-field'
import type { ILoginForm } from './types'

const LoginForm = ({ isLoading, mode }: ILoginForm) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <PFTextField name="username" label="Username" />
      <PFTextField name="password" label="Password" type="password" />
      <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
        {isLoading
          ? mode === 'login'
            ? 'Signing in...'
            : 'Signing up...'
          : mode === 'login'
            ? 'Sign In'
            : 'Sign Up'}
      </Button>
      <Box textAlign="center">
        <Link
          to={mode === 'login' ? '/register' : '/login'}
          style={{ textDecoration: 'none', color: '#1976d2' }}
        >
          {mode === 'login'
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Sign In'}
        </Link>
      </Box>
    </Box>
  )
}

export default LoginForm
