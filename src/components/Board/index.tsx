import { useEffect } from 'react'
import { populateBoard } from '../../features/gameSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import Cell from './Cell'
import * as S from './style'

const Board = () => {
  const dispatch = useAppDispatch()
  const { setting } = useAppSelector((state) => state.levelReducer)
  const { board } = useAppSelector((state) => state.gameReducer)

  useEffect(() => {
    dispatch(populateBoard(setting))
  }, [])

  return (
    <S.Main columns={setting.columns}>
      {board.map((rows, y) =>
        rows.map((cell, x) => <Cell key={`${x}, ${y}`} coord={{ x, y }} cell={cell} />)
      )}
    </S.Main>
  )
}

export default Board
