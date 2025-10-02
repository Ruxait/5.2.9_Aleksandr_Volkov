import { Title } from '@mantine/core'
import { LaunchesGrid } from './modules/LaunchesGrid'

function App() {
  return (
    <>
      <Title order={2} mb="lg" style={{ textAlign: 'center' }}>
        SpaceX Launches 2020
      </Title>
      <LaunchesGrid />
    </>
  )
}

export default App
