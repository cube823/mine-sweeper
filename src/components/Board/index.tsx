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

  return (
    <Main columns={setting.columns}>
      {board.map((rows, y) =>
        rows.map((cell, x) => <Cell key={`${x}, ${y}`} coord={{ x, y }} cell={cell} />)
      )}
    </Main>
  )
}

const Main = styled.div<{ columns: number }>`
  display: grid;
  border-color: #bdbdbd #fff #fff #bdbdbd;
  border-style: inset;
  border-width: 2px;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, minmax(0, 1fr))`};
`

export default Board
