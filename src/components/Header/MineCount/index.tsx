import { memo } from 'react'
import { useAppSelector } from '../../../store'
import DisplayBoard from '../../Common/DisplayBoard'

const MineCount = () => {
  const { flagCount } = useAppSelector((state) => state.gameReducer)
  const { mines } = useAppSelector((state) => state.levelReducer.setting)
  return <DisplayBoard value={flagCount > 0 ? mines - flagCount : 0} />
}

export default memo(MineCount)
