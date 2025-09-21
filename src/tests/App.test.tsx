// tests/App.test.tsx
import App from '../App'
import '../setupTests'
import { render as rtlRender, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MantineProvider } from '@mantine/core'
import { CartProvider } from '../hooks/useCart'
import { ProductCard } from '../components/ProductCard'
import { ProductCardSkeleton } from '../components/ProductCardSkeleton'
import { ProductGrid } from '../components/ProductGrid'
import { Catalog } from '../modules/Catalog'
import { Header } from '../modules/Header'
import { CartDropdown } from '../components/CartDropDawn'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })
})

const render = (ui: React.ReactElement) =>
  rtlRender(
    <MantineProvider>
      <CartProvider>{ui}</CartProvider>
    </MantineProvider>,
  )

const mockProduct = {
  id: 1,
  name: 'Tomato',
  price: 5,
  image: 'tomato.jpg',
  category: 'vegetables',
}

// ProductCard
describe('ProductCard', () => {
  it('рендерит информацию о продукте', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText(/Tomato/i)).toBeInTheDocument()
    expect(screen.getByText('$5')).toBeInTheDocument()
  })

  it('увеличивает и уменьшает количество', () => {
    render(<ProductCard product={mockProduct} />)
    const increaseBtn = screen.getByLabelText('increase quantity')
    const decreaseBtn = screen.getByLabelText('decrease quantity')
    const quantity = screen.getByText('1')

    fireEvent.click(increaseBtn)
    expect(quantity.textContent).toBe('2')
    fireEvent.click(decreaseBtn)
    expect(quantity.textContent).toBe('1')
  })

  it('добавляет товар в корзину при нажатии Add to cart', () => {
    render(<ProductCard product={mockProduct} />)
    const addBtn = screen.getByText(/Add to cart/i)
    fireEvent.click(addBtn)
    expect(screen.getByText('1')).toBeInTheDocument() // бейдж с количеством
  })
})

// ProductCardSkeleton
describe('ProductCardSkeleton', () => {
  it('рендерится корректно', () => {
    render(<ProductCardSkeleton />)
    expect(screen.getByTestId('product-skeleton')).toBeInTheDocument()
  })
})

// ProductGrid
describe('ProductGrid', () => {
  it('показывает скелетоны при isLoading', () => {
    render(<ProductGrid products={[]} isLoading={true} />)
    expect(screen.getAllByTestId('product-skeleton').length).toBeGreaterThan(0)
  })

  it('рендерит продукты после загрузки', () => {
    render(<ProductGrid products={[mockProduct]} isLoading={false} />)
    expect(screen.getByText(/Tomato/i)).toBeInTheDocument()
  })
})

// Catalog
describe('Catalog', () => {
  it('рендерит заголовок Catalog', () => {
    render(<Catalog />)
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument()
  })
})

// Header
describe('Header', () => {
  it('рендерит название магазина и кнопку Cart', () => {
    render(<Header />)
    expect(screen.getByText(/Vegetable/i)).toBeInTheDocument()
    expect(screen.getByText(/Cart/i)).toBeInTheDocument()
  })

  it('показывает бейдж с количеством товаров в корзине', () => {
    render(
      <>
        <Header />
        <ProductCard product={mockProduct} />
      </>,
    )
    const addBtn = screen.getByText(/Add to cart/i)
    fireEvent.click(addBtn)
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})

// CartDropdown
describe('CartDropdown', () => {
  it('показывает товары в корзине', () => {
    render(
      <>
        <ProductCard product={mockProduct} />
        <CartDropdown />
      </>,
    )
    const addBtn = screen.getByText(/Add to cart/i)
    fireEvent.click(addBtn)
    const tomatoes = screen.getAllByText('Tomato')
    expect(tomatoes[1]).toBeInTheDocument()
  })
})

// ---------------- App ----------------
describe('App', () => {
  it('рендерит Header и Catalog', () => {
    render(<App />)
    expect(screen.getByText(/Vegetable/i)).toBeInTheDocument()
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument()
  })
})
