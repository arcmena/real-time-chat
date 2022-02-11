import { useAuth } from 'contexts/AuthContext'

import { Header } from '..'

import { MainLayoutContainer } from './MainLayout.styles'

const MainLayout = ({ children }) => {
  const { loadingUser, errorUser } = useAuth()

  if (loadingUser) {
    return <MainLayoutContainer>Loading...</MainLayoutContainer>
  }

  if (errorUser) {
    return <MainLayoutContainer>Error</MainLayoutContainer>
  }

  return (
    <>
      <Header />
      <MainLayoutContainer>{children}</MainLayoutContainer>
    </>
  )
}

export default MainLayout
