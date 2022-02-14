import styled from 'styled-components'

export const MainLayoutContainer = styled.main`
  font-size: 1.5rem;

  margin: 0 auto;

  width: ${({ containerWidth }) => `calc(${containerWidth}px - 27%)`};
  height: ${({ containerHeight }) => `calc(${containerHeight}px - 20%)`};

  @media (max-width: 1336px) {
    width: ${({ containerWidth }) => `calc(${containerWidth}px - 10%)`};
    height: ${({ containerHeight }) => `calc(${containerHeight}px - 10%)`};
  }
`
