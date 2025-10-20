import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import ky from 'ky'
import { type Vacancy } from '../../types/vacancy'

export interface VacanciesState {
  items: Vacancy[]
  search: string
  skills: string[]
  loading: boolean
  error: string | null
  area: string
  selectedVacancy: Vacancy | null
}

const initialState: VacanciesState = {
  items: [],
  search: '',
  skills: ['TypeScript', 'React', 'Redux'],
  area: '',
  loading: false,
  error: null,
  selectedVacancy: null,
}

export const getVacancyById = createAsyncThunk<Vacancy, string, { rejectValue: string }>(
  'vacancies/getById',
  async (id, thunkAPI) => {
    try {
      const data = await ky.get(`https://api.hh.ru/vacancies/${id}`).json<Vacancy>()
      return data
    } catch (err) {
      return thunkAPI.rejectWithValue(err instanceof Error ? err.message : 'Не удалось загрузить вакансию')
    }
  },
)

export const getVacancies = createAsyncThunk<Vacancy[], string | void, { state: any; rejectValue: string }>(
  'vacancies/getAll',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState().vacanciesReducer
      const { search, skills, area } = state

      const params: Record<string, string | number> = {
        professional_role: 96,
        industry: 7,
        per_page: 100,
      }

      if (search.trim()) {
        params.text = search
      }

      if (skills.length > 0) {
        params.text = params.text ? `${params.text} ${skills.join(' ')}` : skills.join(' ')
      }

      if (area) {
        params.area = area
      }

      const data = await ky.get('https://api.hh.ru/vacancies', { searchParams: params }).json<{ items: Vacancy[] }>()

      return data.items
    } catch (err) {
      return thunkAPI.rejectWithValue(err instanceof Error ? err.message : 'Не удалось загрузить вакансии')
    }
  },
)

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
  extraReducers: builder => {
    builder
      .addCase(getVacancies.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getVacancies.fulfilled, (state, action: PayloadAction<Vacancy[]>) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(getVacancies.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(getVacancyById.pending, state => {
        state.loading = true
        state.error = null
        state.selectedVacancy = null
      })
      .addCase(getVacancyById.fulfilled, (state, action: PayloadAction<Vacancy>) => {
        state.selectedVacancy = action.payload
        state.loading = false
      })
      .addCase(getVacancyById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default vacanciesSlice.reducer
