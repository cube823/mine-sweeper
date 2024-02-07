import { ChangeEvent, MouseEvent, useState } from 'react'
import { Setting, updateLevel, updateSetting } from '../../../features/levelSlice'
import { populateBoard } from '../../../features/gameSlice'
import { useAppDispatch } from '../../../store'
import { Modal } from '../../Common/Modal/style'

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
      alert(
        'Minesweeper dimensions invalid\nWidth from 1 to 49\nHeight from 1 to 49\nMines from 1 to squares / 3'
      )
      return
    }

    dispatch(updateSetting(setting))
    dispatch(populateBoard(setting))
    dispatch(updateLevel('custom'))
    closeModal(e)
  }

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Custom Game Setup</Modal.Title>
        <Modal.CloseButton onClick={closeModal}>CLOSE</Modal.CloseButton>
      </Modal.Header>

      <Modal.Content>
        <Modal.Flex>
          <Modal.Label>Game Height: </Modal.Label>
          <Modal.Input name='rows' value={setting.rows ?? ''} onChange={handleSettingChange} />
        </Modal.Flex>
        <Modal.Flex>
          <Modal.Label>Game Width: </Modal.Label>
          <Modal.Input
            name='columns'
            value={setting.columns ?? ''}
            onChange={handleSettingChange}
          />
        </Modal.Flex>
        <Modal.Flex>
          <Modal.Label>Number of Bombs: </Modal.Label>
          <Modal.Input name='mines' value={setting.mines ?? ''} onChange={handleSettingChange} />
        </Modal.Flex>
      </Modal.Content>

      <Modal.Flex>
        <Modal.SubmitButton onClick={onSubmit}>Ok</Modal.SubmitButton>
      </Modal.Flex>
    </Modal.Dialog>
  )
}

export default CustomModal
