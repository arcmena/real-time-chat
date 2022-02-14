import styled, { css } from 'styled-components'

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;

  width: 100%;

  position: relative;

  justify-content: ${({ mine }) => (mine ? 'flex-end' : 'flex-start')};
`

export const MessageContent = styled.div`
  padding: 1rem;
  max-width: 60%;

  font-size: 2rem;
  color: var(--colors-primary-white);

  ${({ mine }) =>
    mine
      ? css`
          background-color: var(--colors-primary-green);
          color: white;

          position: relative;

          box-shadow: 3px 3px 0px 0px var(--colors-backdrop);

          &:after {
            content: '';
            position: absolute;
            display: block;
            width: 0;
            z-index: 1;
            border-style: solid;
            border-width: 12px 10px 0 0;
            border-color: var(--colors-primary-green) transparent transparent
              transparent;
            top: 0;
            right: -10px;
          }
        `
      : css`
          margin-bottom: 2.2rem;
          background-color: var(--colors-primary-gray);
          color: black;

          position: relative;

          box-shadow: 3px 3px 0px 0px var(--colors-backdrop);

          &:after {
            content: '';
            position: absolute;
            display: block;
            width: 0;
            z-index: 1;
            border-style: solid;
            border-width: 0 12px 10px 0;
            border-color: transparent var(--colors-primary-gray) transparent
              transparent;
            top: 0;
            left: -12px;
          }
        `}
`
