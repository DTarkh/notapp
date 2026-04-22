import { createFileRoute } from '@tanstack/react-router'
import { queryOptions } from '@tanstack/react-query'
import { getNotes } from '#/lib/server'
import { HomePage } from '#/pages/home/ui/Home'

export const notesListQueryOptions = () =>
  queryOptions({
    queryKey: ['notes'],
    queryFn: () => getNotes({ data: { sort: 'newest' } }),
  })

export const Route = createFileRoute('/')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(notesListQueryOptions()),
  component: HomePage,
})
