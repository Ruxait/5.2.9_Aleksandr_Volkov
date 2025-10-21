import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface VacanciesState {
  search: string
  skills: string[]
  area: string
}

const initialState: VacanciesState = { 
  search: '',
  skills: ['TypeScript', 'React', 'Redux'],
  area: '',

}

export const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    addSkill(state, action: PayloadAction<string>) {
      const skill = action.payload.trim()
      if (skill && !state.skills.includes(skill)) {
        state.skills.push(skill)
      }
    },
    removeSkill(state, action: PayloadAction<string>) {
      state.skills = state.skills.filter(s => s !== action.payload)
    },
    setArea: (state, action: PayloadAction<string>) => {
      state.area = action.payload
    },
  },
})

export default vacanciesSlice.reducer
