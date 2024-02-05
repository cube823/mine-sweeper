import { MouseEvent, useMemo } from 'react'
import { styled } from 'styled-components'
import { Coord, ICell, makeFlag, revealCell } from '../../../features/gameSlice'
import { useAppDispatch } from '../../../store'

const Cell = ({ cell, coord }: { cell: ICell; coord: Coord }) => {
  const dispatch = useAppDispatch()

  const onClick = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    if (e.button !== 0) return

    dispatch(revealCell(coord))
  }

  const onContextMenu = (e: MouseEvent<HTMLImageElement>) => {
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
      case 'unveiled':
        return '/time_eight.png'
      default:
        return '/time_nine.png'
    }
  }, [cell.type])

  return <Main onClick={onClick} onContextMenu={onContextMenu} src={src} />
}

const Main = styled.img`
  width: 16px;
  height: 16px;
  display: inline-block;
  image-rendering: pixelated;
  cursor: pointer;
`

export default Cell
