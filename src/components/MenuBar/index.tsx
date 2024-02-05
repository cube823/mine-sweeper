import { useState } from 'react'
import { populateBoard } from '../../features/gameSlice'
import { Level, levelState, updateLevel, updateSetting } from '../../features/levelSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import Image from '../Common/Image'
import CustomModal from './CustomModal'
import * as S from './style'

const menu = ['Game']
const levelList = Object.keys(levelState) as Level[]

const MenuBar = () => {
  const dispatch = useAppDispatch()
  const { level: currentLevel } = useAppSelector((state) => state.levelReducer)
  const { setting } = useAppSelector((state) => state.levelReducer)

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
                {currentLevel === level && (
                  <Image
                    src={'/checked.gif'}
                    alt='checked'
                    width={10}
                    height={10}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '-10px',
                    }}
                  />
                )}
                {level}
              </S.Option>
            ))}
          </S.Frame>
        </S.Modal>
      )}

      {customModalIsOpen && (
        <CustomModal currentSetting={setting} toggleModalOpen={toggleCustomModalIsOpen} />
      )}
    </S.Main>
  )
}

export default MenuBar
