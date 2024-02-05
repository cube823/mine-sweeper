import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type Level = 'beginner' | 'intermediate' | 'expert' | 'custom'

export interface Setting {
  rows: number
  columns: number
  mines: number
}

interface LevelSlice {
  level: Level
  setting: Setting
}

export const levelState: Record<Level, Setting> = {
  beginner: {
    rows: 8,
    columns: 8,
    mines: 10,
  },

  intermediate: {
    rows: 16,
    columns: 16,
    mines: 40,
  },

  expert: {
    rows: 16,
    columns: 31,
    mines: 99,
  },

  custom: {
    rows: 8,
    columns: 8,
    mines: 10,
  },
}

const initialState: LevelSlice = {
  level: 'beginner',
  setting: levelState['beginner'],
}

const levelSlice = createSlice({
  name: 'levelSlice',
  initialState,
  reducers: {
    updateLevel: (state, action: PayloadAction<Level>) => {
      state.level = action.payload
    },

    updateSetting: (state, action: PayloadAction<LevelSlice['setting']>) => {
      state.setting = action.payload
    },
  },
})

export const { updateLevel, updateSetting } = levelSlice.actions

export default levelSlice.reducer
