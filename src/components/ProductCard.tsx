import { Card, Image, Text, Group, Button, ActionIcon, rem, Flex } from '@mantine/core'
import ShoppingCartG from '../assets/ShoppingCartG.svg'
import { type Product } from '../types/product'
import { useState } from 'react'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { useCart } from '../hooks/useCart'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleDecrease = () => setQuantity(q => Math.max(1, q - 1))
  const handleIncrease = () => setQuantity(q => q + 1)

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1); 
  };

  return (
    <Card radius="md">
      <Card.Section>
        <div
          style={{
            height: 300, // вытянутая высота
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image src={product.image} alt={product.name} style={{ maxHeight: '100%', width: '90%' }} fit="contain" />
        </div>
      </Card.Section>

      <Flex align="center" justify={'space-between'}>
        <Text fw={600}>
          {product.name}
        </Text>
        <Group gap={1}>
          <ActionIcon variant="light" color="gray" onClick={handleDecrease} radius="md" size="sm" aria-label="decrease quantity">
            <IconMinus style={{ width: rem(16), height: rem(16) }} />
          </ActionIcon>

          <Text w={30} ta="center" fw={600}>
            {quantity}
          </Text>

          <ActionIcon variant="light" color="gray" onClick={handleIncrease} radius="md" size="sm" aria-label="increase quantity">
            <IconPlus style={{ width: rem(16), height: rem(16) }} />
          </ActionIcon>
        </Group>
      </Flex>

      <Flex align="center" justify={'space-between'} mt="xs" gap={'10px'}>
        <Text fw={700} size="lg">
          ${product.price}
        </Text>
        <Button
          fullWidth
          rightSection={<Image src={ShoppingCartG} h={18} w="auto" fit="contain" />}
          color="#3B944E"
          variant="light"
          radius="md"
          onClick={handleAddToCart}>
          Add to cart
        </Button>
      </Flex>
    </Card>
  )
}
