import { styled } from 'styled-components'

const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.gray};
`

const Dialog = styled.dialog`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 300px;
  top: 50%;
  left: 0;
  gap: 20px;
  z-index: 100;

  transform: translate(0%, -50%);

  padding: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  border: 0;

  &::backdrop {
    background-color: ${({ theme }) => theme.colors.white};
  }
`

const Header = styled.div`
  width: 100%;
  display: flex;
  font-family: 'Open Sans', sans serif;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.p`
  display: block;
  font-size: 24px;

  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`

const CloseButton = styled.button`
  font-size: 24px;
  display: block;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 8px 4px 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.black};
`

const Content = styled.div`
  display: grid;
  gap: 10px;
`

const Label = styled.label`
  display: block;
  font-weight: bold;
  width: 120px;
`

export const Modal = { Flex, Input, Dialog, Header, Title, CloseButton, Content, Label }
