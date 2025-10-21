import { combineReducers, configureStore } from '@reduxjs/toolkit'
import vacanciesReducer from './reducers/vacanciesSlice'
import { vacanciesApi } from '../api/vacanciesApi'

const rootReducer = combineReducers({
  vacanciesReducer,
  [vacanciesApi.reducerPath]: vacanciesApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(vacanciesApi.middleware),
  })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppState = ReturnType<typeof setupStore>
export type AppDispatch = AppState['dispatch']
