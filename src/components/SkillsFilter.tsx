import { useState } from 'react'
import { Card, Text, TextInput, Button, Pill, PillsInput, Flex } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useTypedDispatch, useTypedSelector } from '../hooks/redux'
import { vacanciesSlice } from '../store/reducers/vacanciesSlice'
import { vacanciesApi } from '../api/vacanciesApi'

export const SkillsFilter = () => {
  const dispatch = useTypedDispatch()
  const { skills } = useTypedSelector(state => state.vacanciesReducer)
  const { addSkill, removeSkill } = vacanciesSlice.actions
  const [inputValue, setInputValue] = useState('')
  const [triggerGetVacancies] = vacanciesApi.useLazyGetVacanciesQuery()

  const handleAddSkill = () => {
    if (inputValue.trim()) {
      dispatch(addSkill(inputValue))
      triggerGetVacancies({})
      setInputValue('')
    }
  }

  const handleRemoveSkill = (skill: string) => {
    dispatch(removeSkill(skill))
    triggerGetVacancies({})
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddSkill()
    }
  }

  return (
    <Card shadow="sm" radius="lg" p="lg" withBorder style={{ backgroundColor: '#fafafa' }}>
      <Text fw={600} mb="sm" size="md">
        Ключевые навыки
      </Text>

      <Flex align="center" gap="xs" mb="sm">
        <TextInput
          placeholder="Навык"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          radius="md"
          size="sm"
          style={{ flex: 1 }}
        />
        <Button
          radius="md"
          size="sm"
          onClick={handleAddSkill}
          style={{ backgroundColor: '#74c0fc', padding: '6px 10px' }}>
          <IconPlus size={18} color="white" />
        </Button>
      </Flex>

      <PillsInput radius="md" style={{ flexWrap: 'wrap', gap: 6, maxWidth: '300px' }}>
        {skills.map(skill => (
          <Pill
            key={skill}
            withRemoveButton
            onRemove={() => handleRemoveSkill(skill)}
            radius="xl"
            size="sm"
            style={{ margin: '4px' }}>
            {skill}
          </Pill>
        ))}
      </PillsInput>
    </Card>
  )
}
