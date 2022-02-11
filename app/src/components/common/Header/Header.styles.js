import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;

  padding-bottom: 1rem;

  width: 100%;
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
