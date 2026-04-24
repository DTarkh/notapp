import { deleteNote, toggleShare, updateNote } from '#/lib/server'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { showToast } from '../util/showToast'

export const useSaveNote = (
  id: string,
  setIsEditing: (isEditing: boolean) => void,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { title: string; content: string }) =>
      updateNote({ data: { id, ...data } }),
    onSuccess: (row) => {
      queryClient.setQueryData(['notes', id], row)
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      showToast('Note saved successfully')
      setIsEditing(false)
    },
    onError: (error) => {
      showToast('Error saving note', error)
    },
  })
}

export const useDeleteNote = (
  id: string,
  setConfirmOpen: (open: boolean) => void,
) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: () => deleteNote({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      setConfirmOpen(false)
      navigate({ to: '/' })
      showToast('Note deleted successfully')
    },
    onError: (error) => {
      showToast('Failed to delete note', error)
    },
  })
}

export const useShareNote = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => toggleShare({ data: { id } }),
    onSuccess: (row) => {
      queryClient.setQueryData(['notes', id], row)
      showToast('Note shared successfully')
    },
    onError: (error) => {
      showToast('Failed to share note', error)
    },
  })
}
