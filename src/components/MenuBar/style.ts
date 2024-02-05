import { styled } from 'styled-components'

const Main = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const Item = styled.div`
  height: 14px;
  margin-left: 2px;
  margin-bottom: 2px;
`

const Select = styled.div`
  position: absolute;
  top: 24px;
  left: 4px;
  background-color: ${({ theme }) => theme.colors.gray};
  z-index: 100;
  display: grid;
  border: 1px solid ${({ theme }) => theme.colors.black};
  padding: 2px;
`

const Frame = styled.div`
  display: grid;
  border: 1px solid ${({ theme }) => theme.colors.black};
  padding: 1px 10px 1px 10px;
`

const Option = styled.div`
  position: relative;
  display: flex;
  gap: 2px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`

export { Main, Item, Select, Frame, Option }
