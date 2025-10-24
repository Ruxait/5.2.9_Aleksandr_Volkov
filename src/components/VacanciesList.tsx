import { Container, Group, Pagination, Text } from '@mantine/core'
import { useState } from 'react'
import { VacancyCardSkeleton } from './VacancyCardSkeleton'
import { VacancyCard } from './VacancyCard'
import { vacanciesApi } from '../api/vacanciesApi'
import { useTypedSelector } from '../hooks/redux'
import { CityTabs } from './CityTabs'
import { useLocation } from 'react-router-dom'

export const VacanciesList = () => {
  const location = useLocation()
  const area = location.pathname.includes('moscow') ? '1' : location.pathname.includes('petersburg') ? '2' : ''
  const { search, skills } = useTypedSelector(state => state.vacanciesReducer)
  const { data: items = [], isLoading } = vacanciesApi.useGetVacanciesQuery({ search, skills, area })
  const [activePage, setActivePage] = useState(1)

  const itemsPerPage = 10
  const startIndex = (activePage - 1) * itemsPerPage
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(items.length / itemsPerPage)

  return (
    <Container size="lg" style={{ flex: 1 }}>
      <CityTabs />
      {isLoading ? (
        Array.from({ length: 10 }).map((_, idx) => <VacancyCardSkeleton key={idx} />)
      ) : items.length > 0 ? (
        paginatedItems.map(vacancy => <VacancyCard key={vacancy.id} vacancy={vacancy} />)
      ) : (
        <Text size="xl">Вакансии не найдены</Text>
      )}

      {items.length > itemsPerPage && (
        <Group mt="xl">
          <Pagination total={totalPages} value={activePage} onChange={setActivePage} radius="md" size="md" />
        </Group>
      )}
    </Container>
  )
}
