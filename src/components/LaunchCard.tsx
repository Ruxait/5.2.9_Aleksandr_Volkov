import { Card, Image, Text, Button } from '@mantine/core'
import { type Launch } from '../types/launch'

export function LaunchCard({ launch, onOpen }: { launch: Launch; onOpen: () => void }) {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Card.Section p="sm">
        <Image src={launch.links?.mission_patch_small} alt={launch.mission_name} height={160} fit="contain" />
      </Card.Section>

      <Text fw={500} mt="md" ta="center">
        {launch.mission_name}
      </Text>
      <Text size="sm" c="dimmed" ta="center">
        {launch.rocket?.rocket_name}
      </Text>

      <Button fullWidth mt="md" radius="md" onClick={onOpen}>
        See more
      </Button>
    </Card>
  )
}
