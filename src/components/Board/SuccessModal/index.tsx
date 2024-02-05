import { useAppSelector } from '../../../store'
import { Modal } from '../../Common/Modal/style'

interface SuccessModalProps {
  closeModal: () => void
}

const SuccessModal = ({ closeModal }: SuccessModalProps) => {
  const { time } = useAppSelector((state) => state.timeReducer)
  const { clickCount } = useAppSelector((state) => state.gameReducer)
  const { columns, rows, mines } = useAppSelector((state) => state.levelReducer.setting)

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Amazing!</Modal.Title>
        <Modal.CloseButton onClick={closeModal}>CLOSE</Modal.CloseButton>
      </Modal.Header>

      <Modal.Content>
        <Modal.Description>Congratulations on winning Minesweeper</Modal.Description>
        <Modal.Description>Game time: {time} seconds</Modal.Description>

        <Modal.Description>
          Game parameters: {columns}x{rows} w/ {mines} bombs Number of clicks was: {clickCount}
        </Modal.Description>
      </Modal.Content>
    </Modal.Dialog>
  )
}

export default SuccessModal
