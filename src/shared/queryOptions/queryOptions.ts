import { getAllNotes, getNote, getNotes } from '#/lib/server'
import { queryOptions } from '@tanstack/react-query'

export const notesListQueryOptions = () =>
  queryOptions({
    queryKey: ['notes'],
    queryFn: () => getNotes({ data: { sort: 'newest' } }),
    staleTime: 1000 * 60 * 5,
  })

export const noteQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['notes', id],
    queryFn: () => getNote({ data: { id } }),
  })

export const allNotesQueryOptions = () =>
  queryOptions({
    queryKey: ['allNotes'],
    queryFn: () => getAllNotes(),
    staleTime: 1000 * 60 * 5,
  })
