import { combineReducers, configureStore } from "@reduxjs/toolkit";
import vacanciesReducer from './reducers/vacanciesSlice'

const rootReducer = combineReducers({
  vacanciesReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppState = ReturnType<typeof setupStore>
export type AppDispatch = AppState['dispatch']