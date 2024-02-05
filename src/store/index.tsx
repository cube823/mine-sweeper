import { useDispatch, useSelector } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import gameReducer from '../features/gameSlice'
import levelReducer from '../features/levelSlice'
import timeReducer from '../features/timeSlice'

const rootReducer = combineReducers({
  gameReducer,
  levelReducer,
  timeReducer,
})

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['levelReducer'],
}

const reducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = <T,>(
  selector: (state: RootState) => T,
  equalityFn?: (left: T, right: T) => boolean
) => useSelector(selector, equalityFn)

export const useAppDispatch = useDispatch
