import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;

  padding: 1rem 1.5rem;

  max-width: 968px;
  margin: 0 auto;
`

export const Logo = styled.img`
  height: 3.5rem;
  user-drag: none;
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;

  gap: 2rem;

  h1 {
    font-size: 2rem;
  }

  button {
    color: var(--colors-primary-white);
    background-color: var(--colors-primary-gray);
    padding: 0.7rem;
  }
`
