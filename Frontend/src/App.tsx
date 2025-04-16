import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import BaseLayout from './layout/BaseLayout'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import ConfirmAccount from './pages/auth/ConfirmAccount'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import AppLayout from './layout/AppLayout'
import Home from './pages/home/Home'
import { ThemeProvider } from './context/theme/ThemeContext'
import { Provider } from 'react-redux'
import Store from './store/Store'

const App = () => {
  return (
    <Provider store={Store}>
    <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BaseLayout/>}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="confirm-account" element={<ConfirmAccount />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route path='/' element={<AppLayout/>}>
          <Route path='/home' element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
    </Provider>
  )
}

export default App