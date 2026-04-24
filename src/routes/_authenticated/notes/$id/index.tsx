import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Editor } from '#/components/Editor/Editor'
import { Button } from '#/shared/ui/Button/Button'
import { ShareBar } from '#/shared/ui/ShareBar/ShareBar'
import { ConfirmDialog } from '#/shared/ui/ConfirmDialog/ConfirmDialog'
import MDEditor from '@uiw/react-md-editor'
import styles from './NoteEditor.module.css'
import { ProgressCircle } from '#/shared/ui/ProgressCircle/ProgressCircle'
import { notesListQueryOptions } from '#/shared/queryOptions/queryOptions'
import {
  useDeleteNote,
  useSaveNote,
  useShareNote,
} from '#/shared/hooks/useCrudOperations'

const NoteEditor = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const { id } = Route.useParams()

  const { data: notes, isPending } = useQuery(notesListQueryOptions())
  const note = notes?.find((n) => n.id === id)

  const { mutate: saveNote, isPending: isSaving } = useSaveNote(id, setIsEditing)

  const { mutate: shareNote, isPending: isSharing } = useShareNote(id)

  const { mutate: deleteNote, isPending: isDeleting } = useDeleteNote(
    id,
    setConfirmOpen,
  )

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
              onToggle={() => shareNote()}
              isPending={isSharing}
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
                onConfirm={() => deleteNote()}
                title="Delete note"
                confirmLabel="Delete"
                isPending={isDeleting}
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
          onSave={saveNote}
          isSaving={isSaving}
        />
      )}
    </>
  )
}

export const Route = createFileRoute('/_authenticated/notes/$id/')({
  component: NoteEditor,
})
