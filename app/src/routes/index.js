import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'

import authStorage from '../lib/authStorage'

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = authStorage.isAuthenticated()

  return isAuthenticated ? children : <Navigate replace to={redirectTo} />
}

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          index
          path="/"
          element={
            <RequireAuth redirectTo="/login">
              <HomePage />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  )
}

export default AppRoutes
