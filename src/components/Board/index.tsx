import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { flagEntireBoard, populateBoard, updateGameStatus } from '../../features/gameSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import Cell from './Cell'
import * as S from './style'
import SuccessModal from './SuccessModal'

const Board = () => {
  const dispatch = useAppDispatch()
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const { setting } = useAppSelector((state) => state.levelReducer)
  const { board, unveiledCount, cells } = useAppSelector((state) => state.gameReducer)

  const closeModal = () => setSuccessModalOpen(false)

  useEffect(() => {
    dispatch(populateBoard(setting))
  }, [])

  useEffect(() => {
    if (unveiledCount + setting.mines === cells.length) {
      dispatch(flagEntireBoard())
      dispatch(updateGameStatus('won'))
      setSuccessModalOpen(true)
    }
  }, [unveiledCount, setting.mines, cells.length])

  return (
    <S.Main columns={setting.columns}>
      {board.map((rows, y) =>
        rows.map((cell, x) => <Cell key={`${x}, ${y}`} coord={{ x, y }} cell={cell} />)
      )}

      {successModalOpen && createPortal(<SuccessModal closeModal={closeModal} />, document.body)}
    </S.Main>
  )
}

export default Board
