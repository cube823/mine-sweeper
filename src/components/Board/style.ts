import { styled } from 'styled-components'

const Main = styled.div<{ columns: number }>`
  display: grid;
  border-color: #bdbdbd #fff #fff #bdbdbd;
  border-style: inset;
  border-width: 2px;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, minmax(0, 1fr))`};
`

export { Main }
