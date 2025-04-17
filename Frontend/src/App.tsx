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
import { Provider } from 'react-redux'
import Store from './store/Store'
import Profile from './pages/home/Profile'
import Session from './pages/sessions/Session'
import {Toaster} from "react-hot-toast";
import { AuthProvider } from './context/auth/authContext'
import PublicRoute from './routes/PublicRoute'
import AuthRoute from './routes/AuthRoute'

const App = () => {
  return (
    <Provider store={Store}>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
                <Route element={<PublicRoute />}>
                  <Route path="/" element={<BaseLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path='/confirm-account' element={<ConfirmAccount/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                  </Route>
                </Route>

                {/* Protected Routes (Requires Authentication) */}
                <Route element={<AuthRoute />}>
                  <Route path="/" element={<AppLayout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/session" element={<Session />} />
                  </Route>
                </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </Provider>
  )
}

export default App;