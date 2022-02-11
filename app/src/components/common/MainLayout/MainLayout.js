import { useAuth } from 'contexts/AuthContext'
import useWindowSize from 'hooks/useWindowSize'

import { Header } from '..'

import { MainLayoutContainer } from './MainLayout.styles'

const MainLayout = ({ children }) => {
  const { loadingUser, errorUser } = useAuth()

  const { width, height } = useWindowSize()

  if (loadingUser) {
    return <MainLayoutContainer>Loading...</MainLayoutContainer>
  }

  if (errorUser) {
    return <MainLayoutContainer>Error</MainLayoutContainer>
  }

  return (
    <MainLayoutContainer containerWidth={width} containerHeight={height}>
      <Header />
      {children}
    </MainLayoutContainer>
  )
}

export default MainLayout
