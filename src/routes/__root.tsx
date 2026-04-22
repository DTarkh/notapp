import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  redirect,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import type { QueryClient } from '@tanstack/react-query'
import '#/app/styles/styles.css'
import { getUserQueryOptions } from '#/hooks/useAuth'
import { getThemeServerFn } from '#/features/themeToggle/model/theme.service'
import type { Theme } from '#/features/themeToggle/model/theme.schema'

interface MyRouterContext {
  queryClient: QueryClient
  theme: Theme
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'NotApp',
      },
    ],
  }),
  shellComponent: RootDocument,
  beforeLoad: async ({ location, context }) => {
    const theme = await getThemeServerFn()

    const user = await context.queryClient.ensureQueryData(
      getUserQueryOptions(),
    )

    const isPublic =
      location.pathname === '/login' || location.pathname.startsWith('/s/')

    if (!user.id && !isPublic) {
      throw redirect({ to: '/login' })
    }

    return { user, theme } as const
  },
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { theme } = Route.useRouteContext()
  return (
    <html lang="en" className={theme}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
