import { useAuth } from 'contexts/AuthContext'

import s from './AppLayout.module.css'

const AppLayout = ({ children }) => {
  const { loadingUser, errorUser } = useAuth()

  if (loadingUser) {
    return <div className={s.root}>Loading...</div>
  }

  if (errorUser) {
    return <div className={s.root}>Error</div>
  }

  return <div className={s.root}>{children}</div>
}

export default AppLayout
