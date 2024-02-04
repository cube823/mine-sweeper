import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface GameSlice {}

const initialState: GameSlice = {}

const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    // updateHederTitle: (state, action: PayloadAction<string>) => {
    //   state.title.text = action.payload
    // },
    // updateHederDescription: (state, action: PayloadAction<string>) => {
    //   state.description.text = action.payload
    // },
  },
})

export const {} = gameSlice.actions

export default gameSlice.reducer
