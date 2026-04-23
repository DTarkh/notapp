import { useRouteContext, useRouter } from '@tanstack/react-router'
import { Monitor, Moon, Sun } from 'lucide-react'
import { setThemeServerFn } from '../model/theme.service'
import type { Theme } from '../model/theme.schema'
import { getNextTheme } from '../model/theme.helper'
import { Button } from '#/shared/ui/Button/Button'

export const ThemeToggle = () => {
  const { theme } = useRouteContext({ from: '__root__' })
  const router = useRouter()

  const toggleTheme = () => {
    setThemeServerFn({ data: getNextTheme(theme as Theme) }).then(() =>
      router.invalidate(),
    )
  }

  return (
    <Button variant="tertiary" onClick={toggleTheme}>
      {theme === 'dark' ? <Moon /> : theme === 'light' ? <Sun /> : <Monitor />}
    </Button>
  )
}
