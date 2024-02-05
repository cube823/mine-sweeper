import { ChangeEvent, MouseEvent, useState } from 'react'
import * as S from './style'
import { Setting, updateLevel, updateSetting } from '../../../features/levelSlice'
import { populateBoard } from '../../../features/gameSlice'
import { useAppDispatch } from '../../../store'

interface CustomModalProps {
  currentSetting: Setting
  toggleModalOpen: () => void
}

const CustomModal = ({ currentSetting, toggleModalOpen }: CustomModalProps) => {
  const dispatch = useAppDispatch()
  const [setting, setSetting] = useState<Setting>(currentSetting)

  const closeModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    toggleModalOpen()
  }

  const handleSettingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (Number.isNaN(Number(value)) && value) return

    setSetting((current) => {
      return { ...current, [name]: value ? Number(value) : 0 }
    })
  }

  const validate = () => {
    if (!setting.rows || !setting.columns || !setting.mines) return false
    if (
      !Number.isInteger(setting.rows) ||
      !Number.isInteger(setting.columns) ||
      !Number.isInteger(setting.mines)
    )
      return false
    if (setting.rows < 1 || setting.rows > 49) return false
    if (setting.columns < 1 || setting.columns > 49) return false
    if (setting.mines < 1 || setting.mines > (setting.rows * setting.columns) / 3) return false

    return true
  }

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    if (!validate()) {
      alert('Minesweeper dimensions invalid')
      return
    }

    dispatch(updateSetting(setting))
    dispatch(populateBoard(setting))
    dispatch(updateLevel('custom'))
    closeModal(e)
  }

  setting?.rows
  return (
    <S.Dialog>
      <S.Header>
        <S.Title>Custom Game Setup</S.Title>
        <S.CloseButton onClick={closeModal}>CLOSE</S.CloseButton>
      </S.Header>

      <S.Content>
        <S.Flex>
          <S.Label>Game Height: </S.Label>
          <S.Input name='rows' value={setting.rows ?? ''} onChange={handleSettingChange} />
        </S.Flex>
        <S.Flex>
          <S.Label>Game Width: </S.Label>
          <S.Input name='columns' value={setting.columns ?? ''} onChange={handleSettingChange} />
        </S.Flex>
        <S.Flex>
          <S.Label>Number of Bombs: </S.Label>
          <S.Input name='mines' value={setting.mines ?? ''} onChange={handleSettingChange} />
        </S.Flex>
      </S.Content>

      <S.Flex>
        <S.CloseButton onClick={onSubmit}>Ok</S.CloseButton>
      </S.Flex>
    </S.Dialog>
  )
}

export default CustomModal
