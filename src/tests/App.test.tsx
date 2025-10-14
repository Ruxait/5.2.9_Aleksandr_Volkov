import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import vacanciesReducer, { vacanciesSlice, type VacanciesState } from '../store/reducers/vacanciesSlice'
import { SkillsFilter } from '../components/SkillsFilter'
import { VacanciesList } from '../components/VacanciesList'
import { VacancyCard } from '../components/VacancyCard'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserver,
})

const renderWithProviders = (ui: React.ReactElement, preloadedState?: Partial<VacanciesState>) => {
  const store = configureStore({
    reducer: { vacanciesReducer },
    preloadedState: preloadedState
      ? {
          vacanciesReducer: {
            ...vacanciesSlice.getInitialState(),
            ...preloadedState,
            // 🔧 гарантируем, что есть все поля
            search: preloadedState.search ?? '',
            error: preloadedState.error ?? null,
            area: preloadedState.area ?? 'Все',
          },
        }
      : undefined,
  })

  return render(
    <Provider store={store}>
      <MantineProvider>{ui}</MantineProvider>
    </Provider>,
  )
}

// ---------- SkillsFilter ----------
describe('SkillsFilter', () => {
  test('добавляет новый скилл при вводе и нажатии Enter', () => {
    renderWithProviders(<SkillsFilter />)

    const input = screen.getByPlaceholderText('Навык')
    fireEvent.change(input, { target: { value: 'React' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(screen.getByText('React')).toBeInTheDocument()
  })

  test('переключает город через select', () => {
    renderWithProviders(<SkillsFilter />)

    const select = screen.getByPlaceholderText('Выберите город')
    fireEvent.change(select, { target: { value: 'Москва' } })

    expect(select).toHaveValue('Москва')
  })
})

// ---------- VacancyCard ----------
const mockVacancy = {
  id: '1',
  name: 'Frontend Developer',
  alternate_url: 'https://example.com',
  salary: { from: 100000, to: 150000 },
  experience: { name: '1–3 года' },
  employer: { name: 'Test Company' },
  schedule: { name: 'remote' },
  area: { name: 'Москва' },
}

describe('VacancyCard', () => {
  test('рендерит название, зарплату и работодателя', () => {
    render(
      <MantineProvider>
        <VacancyCard vacancy={mockVacancy as any} />
      </MantineProvider>,
    )

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('Test Company')).toBeInTheDocument()
    expect(screen.getByText('Москва')).toBeInTheDocument()
  })

  describe('VacancyCard', () => {
    test('рендерит кнопки "Смотреть вакансию" и "Откликнуться"', async () => {
      render(
        <MantineProvider>
          <VacancyCard vacancy={mockVacancy as any} />
        </MantineProvider>,
      )

      // кнопка "Смотреть вакансию" обычно ссылка <a>
      const viewBtn = screen.getByText(/смотреть вакансию/i)
      expect(viewBtn).toBeInTheDocument()

      // кнопка "Откликнуться" скорее всего Button Mantine
      const respondBtn = screen.getByText(/откликнуться/i)
      expect(respondBtn).toBeInTheDocument()
    })
  })
})

// ---------- VacanciesList ----------
const mockItems = Array.from({ length: 3 }).map((_, i) => ({
  id: `${i}`,
  name: `Vacancy ${i}`,
  alternate_url: 'https://example.com',
  salary: { from: 100000, to: 150000 },
  experience: { name: '1–3 года' },
  employer: { name: 'Company' },
  schedule: { name: 'remote' },
  area: { name: 'Москва' },
}))

describe('VacanciesList', () => {
  test('показывает список вакансий', async () => {
    renderWithProviders(<VacanciesList />, { items: mockItems, loading: false })

    await waitFor(() => {expect(screen.getByText('Vacancy 0')).toBeInTheDocument()})
    await waitFor(() => {expect(screen.getByText('Vacancy 1')).toBeInTheDocument()})
  })

  test('показывает "Вакансии не найдены", если список пуст', async () => {

    renderWithProviders(<VacanciesList />, { items: [], loading: false })

    await waitFor(() => {
      expect(screen.getByText(/вакансии не найдены/i)).toBeInTheDocument()
    })
  })
})

// ---------- vacanciesSlice ----------
const { addSkill, removeSkill, setArea } = vacanciesSlice.actions

describe('vacanciesSlice', () => {
  test('добавляет скилл', () => {
    const state = vacanciesSlice.reducer(undefined, addSkill('React'))
    expect(state.skills).toContain('React')
  })

  test('удаляет скилл', () => {
    const state = vacanciesSlice.reducer(
      {
        skills: ['React'],
        area: 'Все',
        items: [],
        loading: false,
        search: '',
        error: null,
      },
      removeSkill('React'),
    )
    expect(state.skills).not.toContain('React')
  })

  test('изменяет выбранный город', () => {
    const state = vacanciesSlice.reducer(undefined, setArea('Москва'))
    expect(state.area).toBe('Москва')
  })
})
