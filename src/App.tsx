import { Header } from './modules/Header'
import { CartProvider } from './hooks/useCart'
import { Catalog } from './modules/Catalog'

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <Catalog />
      </CartProvider>
    </>
  )
}

export default App
