import { Level, toggleLevelModal, updateLevel } from '../../../features/levelSlice'
import { useAppDispatch, useAppSelector } from '../../../store'
import * as S from './style'

const Select = () => {
  const dispatch = useAppDispatch()
  const { level } = useAppSelector((state) => state.levelReducer)

  const handleChange = (level: Level) => {
    if (level === 'custom') return dispatch(toggleLevelModal())

    dispatch(updateLevel(level))
  }

  return <S.Main>Select</S.Main>
}

export default Select
