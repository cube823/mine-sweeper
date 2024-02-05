import { styled } from 'styled-components'

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: auto;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.black};
`

export const Layout = {
  Background,
}
