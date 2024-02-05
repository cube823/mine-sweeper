import { useAppSelector } from '../../store'
import DisplayBoard from './DisplayBoard'
import Emoji from './Emoji'
import * as S from './style'

const Header = () => {
  const { setting } = useAppSelector((state) => state.levelReducer)
  const { time } = useAppSelector((state) => state.timeReducer)

  return (
    <S.Main>
      <DisplayBoard value={setting.mines} />
      <Emoji />
      <DisplayBoard value={time} />
    </S.Main>
  )
}

export default Header
