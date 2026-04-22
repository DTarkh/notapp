import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Editor } from '#/components/Editor/Editor'
import { createNote } from '#/lib/server'
import type { CreateNoteInput } from '#/lib/schemas/notes'

export const Route = createFileRoute('/notes/new/')({
  component: NewNote,
})

function NewNote() {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data: CreateNoteInput) => createNote({ data }),
    onSuccess: (row) => {
      qc.invalidateQueries({ queryKey: ['notes'] })
      navigate({ to: '/notes/$id', params: { id: row.id } })
    },
  })
  return <Editor onSave={mutation.mutate} isSaving={mutation.isPending} />
}
