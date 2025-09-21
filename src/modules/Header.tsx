import { Image, Group, Text, Button, Box, Badge, Popover } from '@mantine/core'
import ShoppingCart from '../assets/ShoppingCart.svg'
import { useState } from 'react'
import { useCart } from '../hooks/useCart'
import { CartDropdown } from '../components/CartDropDawn'

export const Header = () => {
  const { cart } = useCart()
  const [opened, setOpened] = useState(false)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Box
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
      <Group justify="space-between" p="md">
        <Group
          gap="xs"
          style={{
            backgroundColor: '#F7F7F7',
            borderRadius: '20px',
            paddingLeft: '10px',
          }}>
          <Text fw={500} size="xl">
            Vegetable{' '}
          </Text>
          <Badge color="green" variant="filled" fw={400} size="xl">
            SHOP
          </Badge>
        </Group>

        <Popover opened={opened} onChange={setOpened} position="bottom-end" shadow="md" withArrow width={350}>
          <Popover.Target>
            <Button
              rightSection={<Image src={ShoppingCart} h={18} w="auto" fit="contain" />}
              leftSection={
                totalItems > 0 && (
                  <Badge color="white" circle size="sm" style={{ color: 'black', fontWeight: 700 }}>
                    {totalItems}
                  </Badge>
                )
              }
              color="green"
              variant="filled"
              onClick={() => setOpened(!opened)}>
              Cart
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <CartDropdown />
          </Popover.Dropdown>
        </Popover>
      </Group>
    </Box>
  )
}
