import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BaseLayout from './layout/BaseLayout'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import ConfirmAccount from './pages/auth/ConfirmAccount'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import AppLayout from './layout/AppLayout'
import Home from './pages/home/Home'
import { ThemeProvider } from './context/theme/ThemeContext'

const App = () => {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BaseLayout/>}>
            <Route path="" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="confirm-account" element={<ConfirmAccount />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route  element={<AppLayout/>}>
          <Route path='/home' element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App