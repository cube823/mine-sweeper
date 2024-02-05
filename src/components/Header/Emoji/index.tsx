import { useMemo } from 'react'
import { populateBoard } from '../../../features/gameSlice'
import { useAppDispatch, useAppSelector } from '../../../store'
import Image from '../../Common/Image'

const Emoji = () => {
  const dispatch = useAppDispatch()
  const { gameStatus } = useAppSelector((state) => state.gameReducer)
  const { setting } = useAppSelector((state) => state.levelReducer)

  const src = useMemo(() => {
    if (gameStatus === 'lost') return '/facedead.gif'
    if (gameStatus === 'won') return '/facewin.gif'
    return '/facesmile.gif'
  }, [gameStatus])

  const onReset = () => dispatch(populateBoard(setting))

  return (
    <Image clickable width={26} height={26} onClick={onReset} src={src} alt='reset-emoji-button' />
  )
}

export default Emoji
