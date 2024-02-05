import { memo, MouseEvent, useCallback, useMemo } from 'react'
import {
  Coord,
  ICell,
  makeFlag,
  unveilCell,
  startGame,
  updateLeftFlagCount,
} from '../../../features/gameSlice'
import { useAppDispatch, useAppSelector } from '../../../store'
import Image from '../../Common/Image'

const Cell = ({ cell, coord }: { cell: ICell; coord: Coord }) => {
  const dispatch = useAppDispatch()
  const { gameStatus, leftFlagCount } = useAppSelector((state) => state.gameReducer)
  const { mines } = useAppSelector((state) => state.levelReducer.setting)

  const onLeftClick = useCallback(
    (e: MouseEvent<HTMLImageElement>) => {
      e.preventDefault()
      if (e.button !== 0) return
      if (cell.type === 'flagged' || cell.type === 'question') return

      if (gameStatus === 'ready') return dispatch(startGame({ startCoord: coord, mines: mines }))
      if (gameStatus === 'playing') return dispatch(unveilCell(coord))
    },
    [cell.type, gameStatus, coord, mines]
  )

  const onRightClick = useCallback(
    (e: MouseEvent<HTMLImageElement>) => {
      e.preventDefault()
      if (e.button !== 2) return
      if (leftFlagCount === 0 && cell.type === 'veiled') {
        dispatch(updateLeftFlagCount(mines))
      }

      dispatch(makeFlag(coord))
    },
    [coord]
  )

  const src = useMemo(() => {
    switch (cell.type) {
      case 'veiled':
        return '/blank.gif'
      case 'flagged':
        return '/bombflagged.gif'
      case 'question':
        return '/bombquestion.gif'
      case 'mine':
        return '/bombrevealed.gif'
      case 'unveiled':
        if (cell.isMine) return '/bombdeath.gif'
        return `/open${cell.neighborMines}.gif`

      default:
        return '/facepirate.png' // 잘못된 이미지
    }
  }, [cell.type])

  return (
    <Image
      width={16}
      height={16}
      alt='minesweeper-cell'
      onClick={onLeftClick}
      onContextMenu={onRightClick}
      src={src}
    />
  )
}

export default memo(Cell)
