import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import LoginPage from './pages/login/login.page'
import RegisterPage from './pages/register/register.page'
import ProtectedRoute from './components/protected-route'

// Create a default theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
})

const DashboardPlaceholder = () => <h1>Dashboard (Protected)</h1>

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardPlaceholder />} />
            {/* Add Portfolio and Transaction routes here later */}
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
