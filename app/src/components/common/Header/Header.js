import { useNavigate } from 'react-router-dom'

import { useAuth } from 'contexts/AuthContext'

import { Button } from 'components/ui'

import LogoImg from 'assets/img/arctichat-logo-white.png'

import { HeaderContainer, Logo, UserInfo } from './Header.styles'

const Header = () => {
  const { me, logOut } = useAuth()

  const navigate = useNavigate()

  return (
    <HeaderContainer>
      <Logo src={LogoImg} alt="actichat" />

      <UserInfo>
        <h1>{me.username}</h1>
        <Button onClick={() => logOut(navigate)}>log out</Button>
      </UserInfo>
    </HeaderContainer>
  )
}

export default Header
