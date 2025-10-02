import { useEffect, type ReactNode } from 'react'
import { ActionIcon, Overlay, Paper, ScrollArea } from '@mantine/core'
import ReactDOM from 'react-dom'

interface ModalProps {
  children: ReactNode
  onClose: () => void
}

export function Modal({ children, onClose }: ModalProps) {
  const modalRoot = document.getElementById('modal-root') as HTMLElement

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    console.log('aaaa')

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = originalOverflow
    }
  }, [])

  return ReactDOM.createPortal(
    <Overlay
      color="black"
      backgroundOpacity={0.6}
      blur={0}
      fixed
      onClick={onClose}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}
      data-testid="modal-overlay">
      <Paper radius="md" p="lg" shadow="xl" maw={600} w="100%" pos="relative" onClick={e => e.stopPropagation()}>
        <ScrollArea h="50vh" type="scroll" scrollbarSize={0} style={{ maxHeight: '80vh' }}>
          {children}
        </ScrollArea>

        <ActionIcon
          onClick={onClose}
          pos="absolute"
          top={10}
          right={10}
          variant="subtle"
          radius="xl"
          aria-label="Close modal"
          color="gray">
          ✕
        </ActionIcon>
      </Paper>
    </Overlay>,
    modalRoot,
  )
}
