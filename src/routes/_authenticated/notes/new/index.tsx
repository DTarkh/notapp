import { createFileRoute } from '@tanstack/react-router'
import { Editor } from '#/components/Editor/Editor'
import { useAddNote } from '#/shared/hooks/useCrudOperations'

export const Route = createFileRoute('/_authenticated/notes/new/')({
  component: NewNote,
})

function NewNote() {
  const { mutate: addNote, isPending: isAdding } = useAddNote()

  return (
    <Editor
      onSave={({ title, content }) =>
        addNote({ id: crypto.randomUUID(), title, content })
      }
      isSaving={isAdding}
    />
  )
}
