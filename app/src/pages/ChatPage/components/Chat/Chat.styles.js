import styled from 'styled-components'

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`

export const ChatHeader = styled.header`
  display: flex;
  justify-content: space-between;

  background-color: #28374d;

  padding: 0.7rem;

  h1 {
    font-size: 2.5rem;
  }

  button {
    color: var(--colors-primary-white);
    background-color: var(--colors-primary-gray);
    border-radius: 50%;
    width: auto;
    padding: 0 1.2rem;
  }
`

export const MessagesContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`
