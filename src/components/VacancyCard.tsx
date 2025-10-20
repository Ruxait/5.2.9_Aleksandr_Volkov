import { Card, Text, Group, Badge, Button } from '@mantine/core'
import { type Vacancy } from '../types/vacancy'
import { Link } from 'react-router-dom'

interface VacancyCardProps {
  vacancy: Vacancy
}

export const VacancyCard = ({ vacancy }: VacancyCardProps) => {
  const salaryText = vacancy.salary
    ? `${vacancy.salary.from?.toLocaleString() || ''} – ${vacancy.salary.to?.toLocaleString() || ''} ₽`
    : 'Зарплата не указана'

  return (
    <Card shadow="sm" radius="lg" withBorder mb="lg" p="lg" style={{ backgroundColor: 'white' }}>
      <Text
        component="a"
        href={vacancy.alternate_url}
        target="_blank"
        fw={600}
        c="blue"
        size="lg"
        style={{ textDecoration: 'none' }}>
        {vacancy.name}
      </Text>

      <Group gap="xs" mt={4}>
        <Text fw={500}>{salaryText}</Text>
        <Text c="dimmed" size="sm">
          {vacancy.experience?.name || 'Без опыта'}
        </Text>
      </Group>

      <Text mt="xs" size="sm" fw={500}>
        {vacancy.employer?.name || 'Компания не указана'}
      </Text>

      <Group gap="xs" mt="xs">
        {vacancy.schedule?.name && (
          <Badge color="dark" variant="filled" size="sm">
            {vacancy.schedule.name.toUpperCase()}
          </Badge>
        )}
      </Group>

      <Text mt="xs" size="sm">
        {vacancy.area?.name}
      </Text>

      <Group mt="md">
        <Button
          color="dark"
          variant="filled"
          radius="md"
          size="sm"
          component={Link}
          to={`/vacancy/${vacancy.id}`}
          style={{ fontWeight: 500 }}>
          Смотреть вакансию
        </Button>

        <Button variant="default" radius="md" size="sm" component="a" href={vacancy.alternate_url} target="_blank">
          Откликнуться
        </Button>
      </Group>
    </Card>
  )
}
