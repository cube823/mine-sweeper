import Board from './Board'
import Header from './Header'
import MenuBar from './MenuBar'
import * as S from './style'

const Minesweeper = () => {
  return (
    <S.Main>
      <MenuBar />
      <Header />

      <Board />
    </S.Main>
  )
}

export default Minesweeper
