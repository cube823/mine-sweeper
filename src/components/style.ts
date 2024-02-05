import { styled } from 'styled-components'

const Main = styled.div`
  display: grid;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.gray};
  padding: 5px;
`

export { Main }
