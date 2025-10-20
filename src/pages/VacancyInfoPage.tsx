import { useParams } from 'react-router-dom'
import { useTypedDispatch, useTypedSelector } from '../hooks/redux'
import { Card, Text, Anchor, Badge, Group } from '@mantine/core'
import { useEffect } from 'react'
import { getVacancyById } from '../store/reducers/vacanciesSlice'
import { VacancyCardSkeleton } from '../components/VacancyCardSkeleton'

export const VacancyInfoPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useTypedDispatch()
  const { selectedVacancy, loading } = useTypedSelector(state => state.vacanciesReducer)

  useEffect(() => {
    if (id) {
      dispatch(getVacancyById(id))
    }
  }, [id, dispatch])

  if (loading) return <VacancyCardSkeleton />

  if (!selectedVacancy) return <Text>Вакансия не найдена</Text>

  const salaryText = selectedVacancy.salary
    ? `${selectedVacancy.salary.from?.toLocaleString() || ''} – ${selectedVacancy.salary.to?.toLocaleString() || ''} ₽`
    : 'Зарплата не указана'

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
      <Card shadow="sm" radius="lg" withBorder mb="lg" p="lg" style={{ backgroundColor: 'white' }}>
        <Text
          component="a"
          href={selectedVacancy.alternate_url}
          target="_blank"
          fw={600}
          c="blue"
          size="lg"
          style={{ textDecoration: 'none' }}>
          {selectedVacancy.name}
        </Text>

        <Group gap="xs" mt={4}>
          <Text fw={500}>{salaryText}</Text>
          <Text c="dimmed" size="sm">
            {selectedVacancy.experience?.name || 'Без опыта'}
          </Text>
        </Group>

        <Text mt="xs" size="sm" fw={500}>
          {selectedVacancy.employer?.name || 'Компания не указана'}
        </Text>

        <Group gap="xs" mt="xs">
          {selectedVacancy.schedule?.name && (
            <Badge color="dark" variant="filled" size="sm">
              {selectedVacancy.schedule.name.toUpperCase()}
            </Badge>
          )}
        </Group>

        <Text mt="xs" size="sm">
          {selectedVacancy.area?.name}
        </Text>

        <Anchor
          href={selectedVacancy.alternate_url}
          target="_blank"
          rel="noopener noreferrer"
          mt="md"
          fw={500}
          style={{
            maxWidth: '250px',
            color: 'white', // цвет текста
            backgroundColor: 'black', // фон
            borderRadius: '8px', // скругление
            padding: '8px 16px', // внутренние отступы
            textDecoration: 'none', // убрать подчеркивание
          }}>
          Перейти к вакансии на hh.ru
        </Anchor>
      </Card>
      <Card mt="xl" padding="lg" radius="md" withBorder>
        <div dangerouslySetInnerHTML={{ __html: selectedVacancy.description ?? '' }} style={{ lineHeight: 1.6 }} />
      </Card>
    </div>
  )
}
