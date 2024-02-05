import { memo, useEffect } from 'react'
import { updateTime } from '../../../features/timeSlice'
import { useAppDispatch, useAppSelector } from '../../../store'
import DisplayBoard from '../../Common/DisplayBoard'

const CountDown = () => {
  const dispatch = useAppDispatch()
  const { gameStatus } = useAppSelector((state) => state.gameReducer)
  const { time } = useAppSelector((state) => state.timeReducer)

  useEffect(() => {
    if (gameStatus === 'ready') dispatch(updateTime(0))
    if (gameStatus !== 'playing') return

    const interval = setInterval(() => {
      if (time > 999) return clearInterval(interval)
      else dispatch(updateTime(time + 1))
    }, 1000)

    return () => clearInterval(interval)
  }, [gameStatus, time])

  return <DisplayBoard value={time} />
}

export default memo(CountDown)
