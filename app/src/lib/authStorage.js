const AUTH_STORAGE = 'arctichat-auth'

const authStorage = {
  setToken: token => localStorage.setItem(AUTH_STORAGE, token),
  getToken: () => localStorage.getItem(AUTH_STORAGE),
  isAuthenticated: () => !!localStorage.getItem(AUTH_STORAGE)
}

export default authStorage
