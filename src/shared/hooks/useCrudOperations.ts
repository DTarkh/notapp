import { createNote, deleteNote, toggleShare, updateNote } from '#/lib/server'
import type { getNotes } from '#/lib/server'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useRouteContext } from '@tanstack/react-router'
import { showToast } from '../util/showToast'
import {
  notesListQueryOptions,
  noteQueryOptions,
} from '#/shared/queryOptions/queryOptions'
import type { CreateNoteInput } from '#/lib/schemas/notes'

type NoteRow = Awaited<ReturnType<typeof getNotes>>[number]

/** New note: client-chosen id (UUID) + fields; id must match server `create` when provided. */
type AddNoteVariables = CreateNoteInput & { id: string }

export const useSaveNote = (
  id: string,
  setIsEditing: (isEditing: boolean) => void,
) => {
  const queryClient = useQueryClient()
  const listKey = notesListQueryOptions().queryKey
  const detailKey = noteQueryOptions(id).queryKey

  return useMutation({
    mutationFn: (data: { title: string; content: string }) =>
      updateNote({ data: { id, ...data } }),

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: listKey })
      await queryClient.cancelQueries({ queryKey: detailKey })

      const previousList = queryClient.getQueryData<Array<NoteRow>>(listKey)
      const previousDetail = queryClient.getQueryData<NoteRow>(detailKey)

      const now = new Date()

      queryClient.setQueryData<Array<NoteRow>>(listKey, (old) =>
        old?.map((n) =>
          n.id === id
            ? { ...n, title: data.title, content: data.content, updatedAt: now }
            : n,
        ),
      )
      queryClient.setQueryData<NoteRow>(detailKey, (old) =>
        old
          ? { ...old, title: data.title, content: data.content, updatedAt: now }
          : old,
      )

      setIsEditing(false)

      return { previousList, previousDetail }
    },

    onError: (error, _data, context) => {
      if (context?.previousList !== undefined) {
        queryClient.setQueryData(listKey, context.previousList)
      }
      if (context?.previousDetail !== undefined) {
        queryClient.setQueryData(detailKey, context.previousDetail)
      }
      showToast('Error saving note', error)
    },

    onSuccess: () => {
      showToast('Note saved successfully')
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}

export const useAddNote = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user } = useRouteContext({ from: '__root__' })
  const listKey = notesListQueryOptions().queryKey

  return useMutation({
    mutationFn: (data: AddNoteVariables) => createNote({ data }),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: listKey })

      const previousList = queryClient.getQueryData<Array<NoteRow>>(listKey)
      const userId = user.id
      if (userId) {
        const now = new Date()
        const optimistic: NoteRow = {
          id: data.id,
          userId,
          title: data.title,
          content: data.content,
          isPublic: false,
          publicSlug: null,
          createdAt: now,
          updatedAt: now,
        }

        queryClient.setQueryData<Array<NoteRow>>(listKey, (old) => [
          optimistic,
          ...(old ?? []),
        ])
      }

      navigate({ to: '/notes/$id', params: { id: data.id } })
      return { previousList }
    },
    onError: (error, _vars, context) => {
      if (context?.previousList !== undefined) {
        queryClient.setQueryData(listKey, context.previousList)
      }
      showToast('Failed to add note', error)
    },
    onSuccess: () => {
      showToast('Note added successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: listKey })
    },
  })
}

export const useDeleteNote = (
  id: string,
  setConfirmOpen: (open: boolean) => void,
) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const listKey = notesListQueryOptions().queryKey

  return useMutation({
    mutationFn: () => deleteNote({ data: { id } }),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: listKey })

      const previousList = queryClient.getQueryData<Array<NoteRow>>(listKey)

      queryClient.setQueryData<Array<NoteRow>>(listKey, (old) =>
        old?.filter((n) => n.id !== id),
      )

      setConfirmOpen(false)

      navigate({ to: '/' })
      return { previousList }
    },

    onError: (error, _vars, context) => {
      if (context?.previousList !== undefined) {
        queryClient.setQueryData(listKey, context.previousList)
      }
      showToast('Failed to delete note', error)
    },

    onSuccess: () => {
      showToast('Note deleted successfully')
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}

export const useShareNote = (id: string) => {
  const queryClient = useQueryClient()
  const listKey = notesListQueryOptions().queryKey
  const detailKey = noteQueryOptions(id).queryKey

  return useMutation({
    mutationFn: () => toggleShare({ data: { id } }),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: listKey })
      await queryClient.cancelQueries({ queryKey: detailKey })

      const previousList = queryClient.getQueryData<Array<NoteRow>>(listKey)
      const previousDetail = queryClient.getQueryData<NoteRow>(detailKey)

      queryClient.setQueryData<Array<NoteRow>>(listKey, (old) =>
        old?.map((n) => (n.id === id ? { ...n, isPublic: !n.isPublic } : n)),
      )
      queryClient.setQueryData<NoteRow>(detailKey, (old) =>
        old ? { ...old, isPublic: !old.isPublic } : old,
      )

      return { previousList, previousDetail }
    },

    onError: (error, _vars, context) => {
      if (context?.previousList !== undefined) {
        queryClient.setQueryData(listKey, context.previousList)
      }
      if (context?.previousDetail !== undefined) {
        queryClient.setQueryData(detailKey, context.previousDetail)
      }
      showToast('Failed to share note', error)
    },

    onSuccess: (row) => {
      // Server returns the authoritative row (including a freshly generated
      // publicSlug on first share) — write it into both caches so the UI
      // reflects it immediately without waiting for the refetch.
      queryClient.setQueryData<Array<NoteRow>>(listKey, (old) =>
        old?.map((n) => (n.id === id ? row : n)),
      )
      queryClient.setQueryData<NoteRow>(detailKey, row)
      showToast('Note shared successfully')
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}
