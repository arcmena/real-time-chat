import styled from 'styled-components'

export const CreateChatContainer = styled.div`
  display: flex;
  justify-content: center;

  margin: 1rem;

  button {
    background-color: var(--colors-primary-green);
    color: var(--colors-primary-white);
    padding: 0.7rem 0;
  }

  form {
    width: 100%;
  }

  input {
    width: 100%;
    padding: 0.7rem;

    border: none;
    outline: none;
  }
`

export const NoChatsMessage = styled.p`
  color: var(--colors-primary-white);

  margin: 2rem 1.5rem;

  text-align: center;

  line-height: 2rem;
`
