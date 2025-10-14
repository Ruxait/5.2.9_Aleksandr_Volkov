import { Container, Group, Pagination, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useTypedDispatch, useTypedSelector } from '../hooks/redux'
import { getVacancies } from '../store/reducers/vacanciesSlice'
import { VacancyCardSkeleton } from './VacancyCardSkeleton'
import { VacancyCard } from './VacancyCard'

export const VacanciesList = () => {
  const { items, loading } = useTypedSelector(state => state.vacanciesReducer)
  const [activePage, setActivePage] = useState(1)
  const dispatch = useTypedDispatch()

  useEffect(() => {
    dispatch(getVacancies())
    console.log('Всего элементов:', items.length)
  }, [dispatch])

  const itemsPerPage = 10
  const startIndex = (activePage - 1) * itemsPerPage
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(items.length / itemsPerPage)

  return (
    <Container size="lg" style={{ flex: 1 }}>
      {loading
        ? Array.from({ length: 10 }).map((_, idx) => <VacancyCardSkeleton key={idx} />)
        : (items.length > 0 ? paginatedItems.map(vacancy => <VacancyCard key={vacancy.id} vacancy={vacancy} />) : (
          <Text size="xl">Вакансии не найдены</Text>
        ) 
      )}

      {items.length > itemsPerPage && (
        <Group mt="xl">
          <Pagination
            total={totalPages}
            value={activePage}
            onChange={setActivePage}
            radius="md"
            size="md"
          />
        </Group>
      )}
    </Container>
  )
}
