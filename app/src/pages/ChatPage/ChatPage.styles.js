import styled from 'styled-components'

export const SideBar = styled.aside`
  max-width: 300px;
  width: 100%;
  overflow-y: auto;
`

export const ChatPageContainer = styled.div`
  background: var(--colors-background-2);
  display: flex;
  height: calc(100% - 45px);
  width: 100%;
`

export const NoActiveChatMessage = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`
