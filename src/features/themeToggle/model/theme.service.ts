import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import { THEME_COOKIE_NAME } from './theme.constants'
import { setThemeValidator } from './theme.schema'

export const getThemeServerFn = createServerFn().handler(
  () => getCookie(THEME_COOKIE_NAME) ?? 'auto',
)

export const setThemeServerFn = createServerFn()
  .inputValidator(setThemeValidator)
  .handler(({ data }) => setCookie(THEME_COOKIE_NAME, data))
