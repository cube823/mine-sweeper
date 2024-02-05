import { useState } from 'react'
import { populateBoard } from '../../features/gameSlice'
import { Level, levelState, updateLevel, updateSetting } from '../../features/levelSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import CustomModal from './CustomModal'
import * as S from './style'

const menu = ['Game']
const levelList = Object.keys(levelState) as Level[]

const MenuBar = () => {
  const dispatch = useAppDispatch()
  const { level: currentLevel } = useAppSelector((state) => state.levelReducer)

  const [selectIsOpen, setSelectIsOpen] = useState(false)
  const [customModalIsOpen, setCustomModalIsOpen] = useState(false)

  const toggleSelectIsOpen = () => setSelectIsOpen((current) => !current)
  const toggleCustomModalIsOpen = () => setCustomModalIsOpen((current) => !current)

  const handleLevelChange = (level: Level) => {
    toggleSelectIsOpen()

    if (level === 'custom') return toggleCustomModalIsOpen()

    dispatch(updateLevel(level))
    dispatch(updateSetting(levelState[level]))
    dispatch(populateBoard(levelState[level]))
  }

  return (
    <S.Main onClick={toggleSelectIsOpen}>
      <S.Item>{menu[0]}</S.Item>

      {selectIsOpen && (
        <S.Modal>
          <S.Frame>
            {levelList.map((level) => (
              <S.Option
                key={level}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()

                  handleLevelChange(level)
                }}
              >
                {currentLevel === level && <S.Checked src={'/checked.gif'} />}
                {level}
              </S.Option>
            ))}
          </S.Frame>
        </S.Modal>
      )}

      {customModalIsOpen && <CustomModal toggleModalOpen={toggleCustomModalIsOpen} />}
    </S.Main>
  )
}

export default MenuBar
