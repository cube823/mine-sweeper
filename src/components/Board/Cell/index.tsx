import { MouseEvent, useMemo } from 'react'
import { styled } from 'styled-components'
import { Coord, ICell, makeFlag, revealCell, startGame } from '../../../features/gameSlice'
import { useAppDispatch, useAppSelector } from '../../../store'

const Cell = ({ cell, coord }: { cell: ICell; coord: Coord }) => {
  const dispatch = useAppDispatch()
  const { gameStatus } = useAppSelector((state) => state.gameReducer)
  const { setting } = useAppSelector((state) => state.levelReducer)

  const onLeftClick = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    if (e.button !== 0) return
    if (cell.type === 'flagged' || cell.type === 'question') return

    if (gameStatus === 'ready')
      return dispatch(startGame({ startPosition: coord, mines: setting.mines }))

    if (gameStatus === 'playing') return dispatch(revealCell(coord))
  }

  const onRightClick = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    if (e.button !== 2) return

    dispatch(makeFlag(coord))
  }

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
        return '/facepirate.png'
    }
  }, [cell.type])

  return <Main onClick={onLeftClick} onContextMenu={onRightClick} src={src} />
}

const Main = styled.img`
  width: 16px;
  height: 16px;
  display: inline-block;
  image-rendering: pixelated;
  cursor: pointer;
`

export default Cell
