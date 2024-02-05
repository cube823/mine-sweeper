import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface TimeSlice {
  time: number
}

const initialState: TimeSlice = {
  time: 0,
}

const timeSlice = createSlice({
  name: 'timeSlice',
  initialState,
  reducers: {
    updateTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload
    },
  },
})

export const { updateTime } = timeSlice.actions

export default timeSlice.reducer
