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
  modalOpen: boolean
}

const initialState: LevelSlice = {
  level: 'beginner',
  modalOpen: false,
  setting: {
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

    toggleLevelModal: (state) => {
      state.modalOpen = !state.modalOpen
    },

    updateSetting: (state, action: PayloadAction<LevelSlice['setting']>) => {
      state.setting = action.payload
    },
  },
})

export const { updateLevel, toggleLevelModal, updateSetting } = levelSlice.actions

export default levelSlice.reducer
