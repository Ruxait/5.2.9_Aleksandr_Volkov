import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Vacancy } from '../types/vacancy';

export const vacanciesApi = createApi({
  reducerPath: 'vacanciesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.hh.ru/' }),
  endpoints: builder => ({
    getVacancies: builder.query<Vacancy[], { search?: string; skills?: string[]; area?: string }>({
      query: ({ search = '', skills = [], area = '' }) => {
        const params: Record<string, string | number> = {
          professional_role: 96,
          industry: 7,
          per_page: 100,
        }

        if (search.trim()) params.text = search
        if (skills.length > 0)
          params.text = params.text
            ? `${params.text} ${skills.join(' ')}`
            : skills.join(' ')
        if (area) params.area = area

        const queryString = new URLSearchParams(params as Record<string, string>).toString()
        return `vacancies?${queryString}`
      },
      transformResponse: (response: { items: Vacancy[] }) => response.items,
    }),

    getVacancyById: builder.query<Vacancy, string>({
      query: id => `vacancies/${id}`,
    }),
  }),
})
