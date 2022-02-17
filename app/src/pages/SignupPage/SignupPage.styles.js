import styled from 'styled-components'

export const SignupPageContainer = styled.div`
  background-color: var(--colors-primary-white);
  -webkit-box-shadow: 6px 4px 0px 2px var(--colors-primary-green);
  -moz-box-shadow: 6px 4px 0px 2px var(--colors-primary-green);
  box-shadow: 6px 4px 0px 2px var(--colors-primary-green);

  padding: 2rem;
  margin: 0 auto;

  max-width: 50rem;

  @media (max-width: 35rem) {
    margin: 0 2rem;
  }
`

export const SignupForm = styled.form`
  font-size: 1.3rem;

  color: var(--colors-primary-black);

  p {
    margin-top: 0.7rem;
  }

  p:last-of-type {
    margin-bottom: 2rem;
  }

  .field {
    margin-top: 2rem;

    &:last-of-type {
      margin-bottom: 2rem;
    }

    -webkit-box-shadow: 2px 2px 0px 0px var(--colors-primary-gray);
    -moz-box-shadow: 2px 2px 0px 0px var(--colors-primary-gray);
    box-shadow: 2px 2px 0px 0px var(--colors-primary-gray);
  }

  .field input {
    font-size: 1.6rem;
    color: var(--colors-primary-black);

    transition: all 0.2s ease-in;
  }

  .field input:focus {
    -webkit-box-shadow: 2px 2px 0px 0px var(--colors-primary-green);
    -moz-box-shadow: 2px 2px 0px 0px var(--colors-primary-green);
    box-shadow: 2px 2px 0px 0px var(--colors-primary-green);
  }

  .submit {
    font-size: 1.8rem;
    padding: 1rem 0;
    letter-spacing: 0.3rem;

    transition: all 0.2s ease-in;
  }

  .valid {
    color: var(--colors-primary-white);
    background-color: var(--colors-primary-green);
  }

  .valid:hover {
    background-color: var(--colors-primary-green-2);
  }

  .invalid {
    color: var(--colors-primary-gray-2);
    background-color: var(--colors-primary-gray);

    cursor: not-allowed;
  }
`
