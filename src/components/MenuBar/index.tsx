import { styled } from 'styled-components'
import { populateBoard } from '../../features/gameSlice'
import { Level, levelState, toggleLevelModal, updateLevel } from '../../features/levelSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import * as S from './style'

const menu = ['Game']

const levelList = Object.keys(levelState) as Level[]

const MenuBar = () => {
  const dispatch = useAppDispatch()
  const { modalOpen, level: currentLevel } = useAppSelector((state) => state.levelReducer)

  const toggleModalOpen = () => dispatch(toggleLevelModal())

  const handleLevelChange = (level: Level) => {
    toggleModalOpen()
    dispatch(updateLevel(level))

    dispatch(populateBoard({ ...levelState[level] }))
  }

  return (
    <S.Main onClick={toggleModalOpen}>
      <S.Item>{menu[0]}</S.Item>

      {modalOpen && (
        <LevelModal>
          <Frame>
            {levelList.map((level) => (
              <Flex key={level} onClick={() => handleLevelChange(level)}>
                {currentLevel === level && <Image src={'/checked.gif'} />}
                {level}
              </Flex>
            ))}
          </Frame>
        </LevelModal>
      )}
    </S.Main>
  )
}

const LevelModal = styled.div`
  position: absolute;
  top: 24px;
  left: 4px;
  background-color: ${({ theme }) => theme.colors.gray};
  z-index: 100;
  display: grid;
  border: 1px solid ${({ theme }) => theme.colors.black};
  padding: 2px;
`

const Frame = styled.div`
  display: grid;
  border: 1px solid ${({ theme }) => theme.colors.black};
  padding: 1px 10px 1px 10px;
`

const Flex = styled.div`
  position: relative;
  display: flex;
  gap: 2px;
`

const Image = styled.img`
  position: absolute;
  top: 0;
  left: -10px;
  width: 10px;
  height: 10px;
  display: inline-block;
  image-rendering: pixelated;
`

export default MenuBar
