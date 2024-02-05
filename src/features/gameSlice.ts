import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Setting } from './levelSlice'

export type GameStatus = 'ready' | 'playing' | 'won' | 'lost'

export interface ICell {
  type: 'veiled' | 'flagged' | 'question' | 'mine' | 'misMine' | 'unveiled'
  isMine: boolean
  isFlagged: boolean
  neighborMines?: number
}

interface GameSlice {
  cells: Coord[]
  board: ICell[][]
  flagCount: number
  unveiledCount: number
  gameStatus: GameStatus
}

export type Coord = {
  x: number
  y: number
}

const initialState: GameSlice = {
  cells: [],
  board: [],
  flagCount: 0,
  unveiledCount: 0,
  gameStatus: 'ready',
}

const getMineCount = (board: ICell[][], coord: Coord) => {
  const { x, y } = coord
  let count = 0
  for (let yOffset = -1; yOffset <= 1; yOffset++) {
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      const newY = y + yOffset
      const newX = x + xOffset
      if (newY >= 0 && newY < board.length && newX >= 0 && newX < board[0].length) {
        if (board[newY][newX].isMine) count++
      }
    }
  }

  return count
}

const areaOpen = (startCoord: Coord, board: ICell[][]) => {
  const stack: Coord[] = [startCoord]
  let unveiledCount = 0

  while (stack.length) {
    const coord = stack.pop()
    if (!coord) return { board, unveiledCount }

    const { x, y } = coord

    if (y < 0 || y >= board.length) continue
    if (x < 0 || x >= board[0].length) continue

    const cell = board[y][x]
    if (cell.type === 'unveiled') continue

    const count = getMineCount(board, coord)

    board[y][x].type = 'unveiled'
    board[y][x].neighborMines = count
    unveiledCount++

    if (!cell.isMine && count === 0) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue
          stack.push({ x: x + dx, y: y + dy })
        }
      }
    }
  }

  return { board, unveiledCount }
}

const unveilEntireBoard = (board: ICell[][]) => {
  const newBoard: ICell[][] = [...board]

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[0].length; x++) {
      if (board[y][x].type === 'unveiled') continue

      if (board[y][x].isMine) {
        if (board[y][x].isFlagged) newBoard[y][x].type = 'flagged'
        else newBoard[y][x].type = 'mine'
      } else {
        if (board[y][x].isFlagged) newBoard[y][x].type = 'misMine'
        else newBoard[y][x].type = 'unveiled'
      }
      const count = getMineCount(board, { x, y })
      newBoard[y][x].neighborMines = count
    }
  }

  return newBoard
}

const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    populateBoard: (state, action: PayloadAction<Setting>) => {
      state.board = []
      state.gameStatus = 'ready'
      state.flagCount = 0

      const cells: Coord[] = []
      for (let y = 0; y < action.payload.rows; y++) {
        state.board.push([])
        for (let x = 0; x < action.payload.columns; x++) {
          cells.push({ x, y })
          state.board[y].push({ type: 'veiled', isMine: false, isFlagged: false })
        }
      }

      state.cells = cells
    },

    startGame: (
      state,
      { payload: { startCoord, mines } }: PayloadAction<{ startCoord: Coord; mines: number }>
    ) => {
      state.gameStatus = 'playing'
      const cells = state.cells.filter((cell) => cell.x !== startCoord.x || cell.y !== startCoord.y)

      for (let mineCount = 0; mineCount < mines; mineCount++) {
        const index = Math.floor(Math.random() * cells.length)
        const { x, y } = cells[index]
        state.board[y][x].isMine = true
        cells.splice(index, 1)
      }

      const { board, unveiledCount } = areaOpen(startCoord, state.board)

      state.board = board
      state.unveiledCount = unveiledCount
    },

    makeFlag: (state, action: PayloadAction<Coord>) => {
      const { x, y } = action.payload
      switch (state.board[y][x].type) {
        case 'veiled':
          state.flagCount += 1
          state.board[y][x].isFlagged = true
          state.board[y][x].type = 'flagged'
          break
        case 'flagged':
          state.flagCount -= 1
          state.board[y][x].isFlagged = false
          state.board[y][x].type = 'question'
          break
        case 'question':
          state.board[y][x].type = 'veiled'
      }

      if (state.unveiledCount === state.cells.length - state.flagCount) {
        state.gameStatus = 'won'
      }
    },

    unveilCell: (state, action: PayloadAction<Coord>) => {
      const { x, y } = action.payload
      if (state.gameStatus !== 'playing') return
      if (state.board[y][x].type !== 'veiled') return

      if (state.board[y][x].isMine) {
        state.board[y][x].type = 'unveiled'
        state.gameStatus = 'lost'
        unveilEntireBoard(state.board)
        return
      }

      const count = getMineCount(state.board, action.payload)

      if (count === 0) {
        const { board, unveiledCount } = areaOpen(action.payload, state.board)
        state.board = board
        state.unveiledCount += unveiledCount
        return
      }

      state.unveiledCount++
      state.board[y][x].neighborMines = count
      state.board[y][x].type = 'unveiled'
    },

    updateGameStatus: (state, action: PayloadAction<GameStatus>) => {
      state.gameStatus = action.payload
    },
  },
})

export const { populateBoard, startGame, updateGameStatus, makeFlag, unveilCell } =
  gameSlice.actions

export default gameSlice.reducer
