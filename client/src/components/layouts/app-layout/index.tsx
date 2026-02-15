import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import { useAppDispatch } from '../../../store/hooks'
import { logout } from '../../../store/auth/authSlice'

const Layout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  //   const user = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Portfolio Manager
          </Typography>

          <Box sx={{ mr: 2 }}>
            <Button color="inherit" component={Link} to="/">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/transactions">
              Transactions
            </Button>
          </Box>

          <Typography variant="body2" sx={{ mr: 2 }}>
            Welcome,
          </Typography>
          <Button color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </Box>
  )
}

export default Layout
