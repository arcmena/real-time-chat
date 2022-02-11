import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import { AuthProvider } from 'contexts/AuthContext'

import ChatPage from 'pages/ChatPage/ChatPage'
import LoginPage from 'pages/LoginPage/LoginPage'

import Layout from 'components/common/MainLayout'

import authStorage from 'lib/authStorage'

const Wrapper = ({ children }) => (
  <AuthProvider>
    <Layout>{children}</Layout>
  </AuthProvider>
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
          path="/*"
          element={
            <RequireAuth>
              <ChatPage />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  )
}

export default AppRoutes
