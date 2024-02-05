import { useEffect } from 'react'
import { styled } from 'styled-components'
import { populateBoard } from '../../features/gameSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import Cell from './Cell'

const Board = () => {
  const dispatch = useAppDispatch()
  const { setting } = useAppSelector((state) => state.levelReducer)
  const { board } = useAppSelector((state) => state.gameReducer)

  useEffect(() => {
    dispatch(populateBoard(setting))
  }, [])

  console.log('board', board)

  return (
    <Main columns={board[0].length}>
      {board.map((rows, y) =>
        rows.map((cell, x) => <Cell key={`${x}, ${y}`} coord={{ x, y }} cell={cell} />)
      )}
    </Main>
  )
}

const Main = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, minmax(0, 1fr))`};
`

export default Board
