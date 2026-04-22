import { z } from 'zod'
import { THEME_OPTIONS } from './theme.constants'

export const setThemeValidator = z.enum(THEME_OPTIONS)

export type Theme = z.infer<typeof setThemeValidator>
