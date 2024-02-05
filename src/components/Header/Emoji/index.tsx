import { useMemo } from 'react'
import { styled } from 'styled-components'
import { populateBoard } from '../../../features/gameSlice'
import { useAppDispatch, useAppSelector } from '../../../store'

const Emoji = () => {
  const dispatch = useAppDispatch()
  const { gameStatus } = useAppSelector((state) => state.gameReducer)
  const { setting } = useAppSelector((state) => state.levelReducer)

  const src = useMemo(() => {
    if (gameStatus === 'lost') return '/facedead.gif'
    return '/facesmile.gif'
  }, [gameStatus])

  const onReset = () => dispatch(populateBoard(setting))

  return <Image onClick={onReset} src={src} alt='reset-emoji-button' />
}

const Image = styled.img`
  width: 26px;
  height: 26px;
  display: inline-block;
  image-rendering: pixelated;
  cursor: pointer;
`

export default Emoji
