import { Divider, Flex, Group, Image, Stack, Text, ActionIcon } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useCart } from '../hooks/useCart'

export const CartDropdown = () => {
  const { cart, totalPrice, incrementItem, decrementItem } = useCart();

  if (cart.length === 0) {
    return (
      <Stack align="center" p="md">
        <Text c="dimmed" size="sm">
          Your cart is empty
        </Text>
      </Stack>
    );
  }

  return (
    <Stack gap="sm" p="md">
      {cart.map((item, index) => (
        <div key={item.product.id} style={{ width: '100%' }}>
          <Flex justify="space-between" align="center" w="100%">
            <Group gap="xs">
              <Image src={item.product.image} h={40} w={40} fit="contain" />
              <div>
                <Text size="sm" fw={600}>
                  {item.product.name}
                </Text>
                <Text size="sm" fw={600}>
                  ${item.product.price}
                </Text>
              </div>
            </Group>

            <Group gap={4}>
              <ActionIcon
                size="sm"
                variant="light"
                color="gray"
                onClick={() => decrementItem(item.product.id)}
              >
                <IconMinus size={14} />
              </ActionIcon>
              <Text fw={600}>{item.quantity}</Text>
              <ActionIcon
                size="sm"
                variant="light"
                color="gray"
                onClick={() => incrementItem(item.product.id)}
              >
                <IconPlus size={14} />
              </ActionIcon>
            </Group>
          </Flex>
          {index < cart.length - 1 && <Divider ml={48} mt="xs" />}
        </div>
      ))}
      <Divider />
      <Flex justify="space-between" w="100%">
        <Text fw={700}>Total</Text>
        <Text fw={700}>${totalPrice}</Text>
      </Flex>
    </Stack>
  );
};
