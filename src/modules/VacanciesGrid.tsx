import { Flex } from '@mantine/core';
import { SkillsFilter } from '../components/SkillsFilter';
import { VacanciesList } from '../components/VacanciesList';
import { Container } from '@mantine/core';

export const VacanciesGrid = () => {
  return (
    <Container size="lg" pt="xl" pb="md">
    <Flex align="flex-start">
      <SkillsFilter/>
      <VacanciesList/>
    </Flex>
    </Container>
  );
};
