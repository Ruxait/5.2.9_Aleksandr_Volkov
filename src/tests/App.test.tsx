import { render as rtlRender, screen, fireEvent, waitFor } from '@testing-library/react'
import '../setupTests'
import { vi } from 'vitest'
import { LaunchCard } from '../components/LaunchCard'
import { Modal } from '../components/Modal'
import { LaunchesGrid } from '../modules/LaunchesGrid'
import * as api from '../api/launches'
import type { Launch } from '../types/launch'
import { MantineProvider } from '@mantine/core'

const render = (ui: React.ReactElement) => rtlRender(<MantineProvider>{ui}</MantineProvider>)

const launches: Launch[] = [
  {
    mission_name: 'Demo Mission',
    rocket: { rocket_name: 'Falcon 9' },
    links: {
      mission_patch_small: 'patch-small.png',
      mission_patch: 'patch.png',
    },
    details: 'Some mission details',
  },
]

vi.spyOn(api, 'getLaunches').mockResolvedValue(launches)

beforeAll(() => {
  const modalRoot = document.createElement('div')
  modalRoot.setAttribute('id', 'modal-root')
  document.body.appendChild(modalRoot)

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
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: ResizeObserver,
  })
})

// ---------- LaunchCard ----------
describe('LaunchCard', () => {
  test('рендерит название миссии и ракеты', () => {
    render(<LaunchCard launch={launches[0]} onOpen={() => {}} />)
    expect(screen.getByText('Demo Mission')).toBeInTheDocument()
    expect(screen.getByText('Falcon 9')).toBeInTheDocument()
  })

  test('вызывает onOpen при клике на кнопку', () => {
    const onOpen = vi.fn()
    render(<LaunchCard launch={launches[0]} onOpen={onOpen} />)
    fireEvent.click(screen.getByRole('button', { name: /see more/i }))
    expect(onOpen).toHaveBeenCalled()
  })
})

// ---------- Modal ----------
describe('Modal', () => {
  test('рендерит children', () => {
    const onClose = vi.fn()
    render(
      <Modal onClose={onClose}>
        <p>Modal content</p>
      </Modal>,
    )
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  test('закрывается по клику на overlay', () => {
    const onClose = vi.fn()
    render(<Modal onClose={onClose}>Hello</Modal>)
    fireEvent.click(screen.getByTestId('modal-overlay'))
    expect(onClose).toHaveBeenCalled()
  })

  test('закрывается по кнопке ✕', () => {
    const onClose = vi.fn()
    render(<Modal onClose={onClose}>Hello</Modal>)
    fireEvent.click(screen.getByLabelText(/close modal/i))
    expect(onClose).toHaveBeenCalled()
  })
})

// ---------- LaunchesGrid ----------
describe('LaunchesGrid', () => {
  test('рендерит список запусков и открывает модалку', async () => {
    render(<LaunchesGrid />)
    expect(await screen.findByText('Demo Mission')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /see more/i }))
    await waitFor(() => expect(screen.getByText(/Some mission details/i)).toBeInTheDocument())
  })
})
