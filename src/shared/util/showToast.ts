import { queue } from '#/shared/ui/Toast/Toast'
import type { ToastContent } from '#/shared/ui/Toast/Toast'

export const showToast = (title: string, error?: Error | string) => {
  if (error) {
    const content: ToastContent = {
      title,
      description:
        error instanceof Error ? error.message : 'Something went wrong.',
      variant: 'error',
    }
    queue.add(content, { timeout: 5000 })
  } else {
    const content: ToastContent = {
      title,
      variant: 'success',
    }
    queue.add(content, { timeout: 5000 })
  }
}
