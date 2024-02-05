import * as S from './style'

const menu = ['Game', 'Option']

const MenuBar = () => {
  return (
    <S.Main>
      {menu.map((item) => (
        <S.Item key={item}>{item}</S.Item>
      ))}
    </S.Main>
  )
}

export default MenuBar
