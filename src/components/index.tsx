import Board from './Board'
import Header from './Header'
import MenuBar from './MenuBar'
import * as S from './style'

const Minesweeper = () => {
  return (
    <S.Main>
      <MenuBar />

      <S.Frame>
        <S.Content>
          <Header />

          <Board />
        </S.Content>
      </S.Frame>
    </S.Main>
  )
}

export default Minesweeper
