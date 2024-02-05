import { styled } from 'styled-components'

const Main = styled.div`
  display: grid;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.gray};
  padding: 7px;
  gap: 5px;
`

const Frame = styled.div`
  display: flex;

  border-color: #fff #7b7b7b #7b7b7b #fff;
  border-style: solid;
  border-width: 2px;
`

const Content = styled.div`
  display: grid;
  gap: 6px;

  border-color: #bdbdbd;
  border-style: solid;
  border-width: 6px;
`

export { Main, Frame, Content }
