import { useEffect, useState } from 'react'
import { populateBoard, updateGameStatus } from '../../features/gameSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import Cell from './Cell'
import * as S from './style'

const Board = () => {
  const dispatch = useAppDispatch()
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const { setting } = useAppSelector((state) => state.levelReducer)
  const { board, unveiledCount, cells, flagCount } = useAppSelector((state) => state.gameReducer)

  useEffect(() => {
    dispatch(populateBoard(setting))
  }, [])

  useEffect(() => {
    if (unveiledCount === cells.length - flagCount && flagCount > 0) {
      dispatch(updateGameStatus('won'))
      setSuccessModalOpen(true)
    }
  }, [unveiledCount, flagCount, cells.length])

  return (
    <S.Main columns={setting.columns}>
      {board.map((rows, y) =>
        rows.map((cell, x) => <Cell key={`${x}, ${y}`} coord={{ x, y }} cell={cell} />)
      )}
    </S.Main>
  )
}

export default Board
