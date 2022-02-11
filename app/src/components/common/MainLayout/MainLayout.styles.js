import styled from 'styled-components'

export const MainLayoutContainer = styled.main`
  font-size: 1.5rem;

  width: ${({ containerWidth }) => `calc(${containerWidth}px - 27%)`};
  height: ${({ containerHeight }) => `calc(${containerHeight}px - 20%)`};
  margin: 0 auto;
`
