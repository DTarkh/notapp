import { getNote, getNotes } from '#/lib/server'
import { queryOptions } from '@tanstack/react-query'

export const notesListQueryOptions = () =>
  queryOptions({
    queryKey: ['notes'],
    queryFn: () => getNotes({ data: { sort: 'newest' } }),
  })

export const noteQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['notes', id],
    queryFn: () => getNote({ data: { id } }),
  })
