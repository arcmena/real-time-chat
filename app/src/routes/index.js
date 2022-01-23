import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'

import authStorage from '../lib/authStorage'
import { UserProvider } from '../contexts/UserContext'
import Layout from '../components/common/AppLayout'

const Wrapper = ({ children }) => (
  <UserProvider>
    <Layout>{children}</Layout>
  </UserProvider>
)

const RequireAuth = ({ children }) => {
  const isAuthenticated = authStorage.isAuthenticated()

  return isAuthenticated ? (
    <Wrapper>{children}</Wrapper>
  ) : (
    <Navigate replace to="/login" />
  )
}

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  )
}

export default AppRoutes
