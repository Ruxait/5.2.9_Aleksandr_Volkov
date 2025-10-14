import { Group, Text, Container, Anchor } from '@mantine/core'
import hhIcon from '../assets/hh.svg'
import userIcon from '../assets/user-circle.svg'

export const Header = () => {
  return (
    <header
      style={{
        borderBottom: '1px solid #e9ecef',
        backgroundColor: 'white',
      }}>
      <Container
        size="lg"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          position: 'relative',
        }}>
        <Group gap="xs">
          <img src={hhIcon} alt="logo" width={28} height={28} />
          <Text fw={700} size="lg" style={{ color: 'black', cursor: 'pointer' }}>
            .FrontEnd
          </Text>
        </Group>
        <Group
          gap="xl"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}>
          <Anchor c="dark" fw={500} underline="never" style={{ cursor: 'pointer' }}>
            Вакансии FE
          </Anchor>
          <Anchor c="gray" fw={500} underline="never" style={{ cursor: 'pointer', display: 'flex' }}>
            <img src={userIcon} alt="logo" width={24} height={24} />
            Обо мне
          </Anchor>
        </Group>
      </Container>
    </header>
  )
}
