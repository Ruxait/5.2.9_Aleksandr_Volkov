import { Card, Skeleton, Group, Button } from "@mantine/core";

export const ProductCardSkeleton = () => {
  return (
    <Card radius="md" withBorder data-testid="product-skeleton">
      <Card.Section>
        <Skeleton height={140} />
      </Card.Section>

      <Skeleton height={20} mt="sm" width="70%" />
      <Skeleton height={20} mt="xs" width="30%" />

      <Group mt="sm">
        <Skeleton height={36} width={80} />
        <Button fullWidth disabled variant="light">
          Loading...
        </Button>
      </Group>
    </Card>
  );
};
