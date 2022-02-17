import styled from 'styled-components'

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  form {
    display: flex;

    padding: 1rem;

    background-color: #2121217a;

    .field {
      -webkit-box-shadow: 2px 2px 0px 0px var(--colors-primary-gray);
      -moz-box-shadow: 2px 2px 0px 0px var(--colors-primary-gray);
      box-shadow: 2px 2px 0px 0px var(--colors-primary-gray);

      width: 100%;
    }

    .field input {
      font-size: 1.6rem;
      color: var(--colors-primary-white);

      transition: all 0.2s ease-in;
    }

    .field input:focus {
      -webkit-box-shadow: 2px 2px 0px 0px var(--colors-primary-green);
      -moz-box-shadow: 2px 2px 0px 0px var(--colors-primary-green);
      box-shadow: 2px 2px 0px 0px var(--colors-primary-green);
    }

    button {
      width: auto;

      margin: 0 1.7rem 0 2rem;
    }
  }
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
    width: auto;
    padding: 0 1.2rem;
  }
`

export const MessagesContainer = styled.div`
  height: 100%;
  overflow-y: auto;

  ul {
    margin: 0 1.7rem;
  }

  li:first-child {
    margin-top: 1rem;
  }
`
