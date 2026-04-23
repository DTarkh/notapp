import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { Editor } from '#/components/Editor/Editor'
import { Button } from '#/shared/ui/Button/Button'
import { ShareBar } from '#/shared/ui/ShareBar/ShareBar'
import { ConfirmDialog } from '#/shared/ui/ConfirmDialog/ConfirmDialog'
import { deleteNote, toggleShare, updateNote } from '#/lib/server'
import MDEditor from '@uiw/react-md-editor'
import styles from './NoteEditor.module.css'
import { ProgressCircle } from '#/shared/ui/ProgressCircle/ProgressCircle'
import { noteQueryOptions } from '#/shared/queryOptions/queryOptions'

const NoteEditor = () => {
  const [isEditing, setIsEditing] = useState(false)
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const qc = useQueryClient()
  const { data: note, isPending } = useQuery(noteQueryOptions(id))

  const save = useMutation({
    mutationFn: (data: { title: string; content: string }) =>
      updateNote({ data: { id, ...data } }),
    onSuccess: (row) => qc.setQueryData(['notes', id], row),
  })

  const share = useMutation({
    mutationFn: () => toggleShare({ data: { id } }),
    onSuccess: (row) => qc.setQueryData(['notes', id], row),
  })

  const [confirmOpen, setConfirmOpen] = useState(false)
  const del = useMutation({
    mutationFn: () => deleteNote({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] })
      setConfirmOpen(false)
      navigate({ to: '/' })
    },
  })

  return (
    <>
      <div className={styles.editor}>
        {isPending && (
          <div className={styles.pending}>
            <ProgressCircle isIndeterminate size={24} />
          </div>
        )}

        {note && (
          <>
            <ShareBar
              isPublic={note.isPublic}
              slug={note.publicSlug}
              onToggle={() => share.mutate()}
              isPending={share.isPending}
            />

            <div className={styles.header}>
              <h1 className={styles.title}>{note.title}</h1>

              <div className={styles.actions}>
                <Button
                  variant="secondary"
                  onPress={() => setIsEditing((prev) => !prev)}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>

                <Button
                  variant="secondary"
                  onPress={() => setConfirmOpen(true)}
                >
                  Delete
                </Button>
              </div>

              <ConfirmDialog
                isOpen={confirmOpen}
                onOpenChange={setConfirmOpen}
                onConfirm={() => del.mutate()}
                title="Delete note"
                confirmLabel="Delete"
                isPending={del.isPending}
              >
                Delete this note? This cannot be undone.
              </ConfirmDialog>
            </div>

            {!isEditing && (
              <MDEditor.Markdown
                source={note.content}
                className={styles.markdownView}
              />
            )}
          </>
        )}
      </div>

      {note && isEditing && (
        <Editor
          initialTitle={note.title}
          initialContent={note.content}
          onSave={save.mutate}
          isSaving={save.isPending}
        />
      )}
    </>
  )
}

export const Route = createFileRoute('/_authenticated/notes/$id/')({
  component: NoteEditor,
})
