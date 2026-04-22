import type { Theme } from './theme.schema'
import { THEME_OPTIONS } from './theme.constants'

export const getNextTheme = (theme: Theme): Theme => {
  const currentIndex = THEME_OPTIONS.indexOf(theme)
  const nextIndex = (currentIndex + 1) % THEME_OPTIONS.length

  return THEME_OPTIONS[nextIndex]
}
