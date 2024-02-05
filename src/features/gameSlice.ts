import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Setting } from './levelSlice'
import { initializeBoard } from '../utils/initializeBoard'

export type GameStatus = 'ready' | 'playing' | 'won' | 'lost'

export interface ICell {
  type: 'veiled' | 'flagged' | 'question' | 'mine' | 'unveiled'
  isMine: boolean
}

interface GameSlice {
  board: ICell[][]
  gameStatus: GameStatus
}

export type Coord = {
  x: number
  y: number
}

const initialState: GameSlice = {
  board: initializeBoard(20, 12, 10),
  gameStatus: 'ready',
}

const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    populateBoard: (state, action: PayloadAction<Setting>) => {
      state.board = []

      const cells: Coord[] = []
      for (let y = 0; y < action.payload.columns; y++) {
        state.board.push([])
        for (let x = 0; x < action.payload.rows; x++) {
          cells.push({ x, y })
          state.board[y].push({ type: 'veiled', isMine: false })
        }
      }

      for (let mineCount = 0; mineCount < action.payload.mines; mineCount++) {
        const index = Math.floor(Math.random() * cells.length)
        const { x, y } = cells[index]
        state.board[y][x].isMine = true
        cells.splice(index, 1)
      }
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
          break
        default:
          return
      }
    },

    revealCell: (state, action: PayloadAction<Coord>) => {
      const { x, y } = action.payload
      if (state.board[y][x].type === 'veiled') {
        state.board[y][x].type = 'unveiled'
      }
    },
  },
})

export const { populateBoard, makeFlag, revealCell } = gameSlice.actions

export default gameSlice.reducer
