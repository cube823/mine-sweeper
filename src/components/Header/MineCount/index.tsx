import { memo } from 'react'
import { useAppSelector } from '../../../store'
import DisplayBoard from '../../Common/DisplayBoard'

const MineCount = () => {
  const { leftFlagCount } = useAppSelector((state) => state.gameReducer)
  return <DisplayBoard value={leftFlagCount} />
}

export default memo(MineCount)
