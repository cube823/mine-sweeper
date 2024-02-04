import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Level = 'beginner' | 'intermediate' | 'expert' | 'custom'

interface LevelSlice {
  level?: Level
  customProps: {
    rows: number
    columns: number
    mines: number
  }
}

const initialState: LevelSlice = {
  level: 'beginner',
  customProps: {
    rows: 8,
    columns: 8,
    mines: 10,
  },
}

const levelSlice = createSlice({
  name: 'levelSlice',
  initialState,
  reducers: {
    updateLevel: (state, action: PayloadAction<Level>) => {
      state.level = action.payload
    },
    updateCustomProps: (state, action: PayloadAction<LevelSlice['customProps']>) => {
      state.customProps = action.payload
    },
  },
})

export const { updateLevel, updateCustomProps } = levelSlice.actions

export default levelSlice.reducer
