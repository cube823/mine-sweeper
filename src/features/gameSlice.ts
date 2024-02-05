import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Setting } from './levelSlice'

export type GameStatus = 'ready' | 'playing' | 'won' | 'lost'

export interface ICell {
  type: 'veiled' | 'flagged' | 'question' | 'mine' | 'unveiled'
  isMine: boolean
  neighborMines?: number
}

interface GameSlice {
  cells: Coord[]

  board: ICell[][]
  gameStatus: GameStatus
}

export type Coord = {
  x: number
  y: number
}

const initialState: GameSlice = {
  cells: [],
  board: [],
  gameStatus: 'ready',
}

const getCount = (board: ICell[][], coord: Coord) => {
  const { x, y } = coord
  let count = 0
  for (let yOffset = -1; yOffset <= 1; yOffset++) {
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      const newY = y + yOffset
      const newX = x + xOffset
      if (newY >= 0 && newY < board.length && newX >= 0 && newX < board[0].length) {
        if (board[newY][newX].isMine) {
          count++
        }
      }
    }
  }

  return count
}

const areaOpen = (startPosition: Coord, board: ICell[][]) => {
  const stack: Coord[] = [startPosition]

  while (stack.length) {
    const coord = stack.pop()
    if (!coord) return board

    const { x, y } = coord

    if (y < 0 || y >= board.length) continue
    if (x < 0 || x >= board[0].length) continue

    const cell = board[y][x]
    if (cell.type === 'unveiled') continue

    const count = getCount(board, coord)

    board[y][x].type = 'unveiled'
    board[y][x].neighborMines = count

    if (!cell.isMine && count === 0) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue
          stack.push({ x: x + dx, y: y + dy })
        }
      }
    }
  }

  return board
}

const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    populateBoard: (state, action: PayloadAction<Setting>) => {
      state.board = []
      state.gameStatus = 'ready'

      const cells: Coord[] = []
      for (let y = 0; y < action.payload.columns; y++) {
        state.board.push([])
        for (let x = 0; x < action.payload.rows; x++) {
          cells.push({ x, y })
          state.board[y].push({ type: 'veiled', isMine: false })
        }
      }

      state.cells = cells
    },

    startGame: (
      state,
      { payload: { startPosition, mines } }: PayloadAction<{ startPosition: Coord; mines: number }>
    ) => {
      state.gameStatus = 'playing'
      const cells = [...state.cells].filter(
        (cell) => cell.x !== startPosition.x || cell.y !== startPosition.y
      )

      for (let mineCount = 0; mineCount < mines; mineCount++) {
        const index = Math.floor(Math.random() * cells.length)
        const { x, y } = cells[index]
        state.board[y][x].isMine = true
        cells.splice(index, 1)
      }

      const newBoard = areaOpen(startPosition, state.board)
      state.board = newBoard
    },

    makeFlag: (state, action: PayloadAction<Coord>) => {
      const { x, y } = action.payload
      switch (state.board[y][x].type) {
        case 'veiled':
          state.board[y][x].type = 'flagged'
          break
        case 'flagged':
          state.board[y][x].type = 'question'
          break
        case 'question':
          state.board[y][x].type = 'veiled'
      }
    },

    revealCell: (state, action: PayloadAction<Coord>) => {
      const { x, y } = action.payload
      if (state.gameStatus !== 'playing') return
      if (state.board[y][x].type !== 'veiled') return

      if (state.board[y][x].isMine) {
        state.board[y][x].type = 'unveiled'
        state.gameStatus = 'lost'
        return
      }

      const count = getCount(state.board, action.payload)

      if (count === 0) {
        state.board = areaOpen(action.payload, state.board)
        return
      }

      state.board[y][x].neighborMines = count
      state.board[y][x].type = 'unveiled'
    },
  },
})

export const { populateBoard, makeFlag, startGame, revealCell } = gameSlice.actions

export default gameSlice.reducer
