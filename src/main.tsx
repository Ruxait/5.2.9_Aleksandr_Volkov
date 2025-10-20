import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <Provider store={store}>
        <BrowserRouter basename="/5.2.5_Aleksandr_Volkov">
          <App />
        </BrowserRouter>
      </Provider>
    </MantineProvider>
  </StrictMode>,
)
