import { QueryClient } from '@tanstack/react-query'
import type { Theme } from '#/features/themeToggle/model/theme.schema'

export function getContext() {
  const queryClient = new QueryClient()
  const theme: Theme = 'auto'

  return {
    queryClient,
    theme,
  }
}
export default function TanstackQueryProvider() {}
