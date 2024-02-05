import CountDown from './CountDown'
import Emoji from './Emoji'
import MineCount from './MineCount'
import * as S from './style'

const Header = () => {
  return (
    <S.Main>
      <MineCount />
      <Emoji />
      <CountDown />
    </S.Main>
  )
}

export default Header
