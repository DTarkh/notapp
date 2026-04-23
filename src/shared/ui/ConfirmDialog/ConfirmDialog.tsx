import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components'
import type { ReactNode } from 'react'
import { Button } from '../Button/Button'
import styles from './ConfirmDialog.module.css'

interface ConfirmDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onConfirm: () => void
  title?: string
  confirmLabel?: string
  cancelLabel?: string
  isPending?: boolean
  children: ReactNode
}

export const ConfirmDialog = ({
  isOpen,
  onOpenChange,
  onConfirm,
  title = 'Confirm',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isPending = false,
  children,
}: ConfirmDialogProps) => {
  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className={styles.overlay}
      isDismissable
    >
      <Modal className={styles.modal}>
        <Dialog className={styles.dialog}>
          {({ close }) => (
            <>
              <Heading slot="title" className={styles.title}>
                {title}
              </Heading>
              <div className={styles.body}>{children}</div>
              <div className={styles.actions}>
                <Button variant="quiet" onPress={close} isDisabled={isPending}>
                  {cancelLabel}
                </Button>
                <Button
                  variant="primary"
                  isPending={isPending}
                  isDisabled={isPending}
                  onPress={() => {
                    onConfirm()
                  }}
                >
                  {confirmLabel}
                </Button>
              </div>
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}
