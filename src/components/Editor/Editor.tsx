import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import {
  FieldError,
  Input,
  Label,
  TextField,
} from 'react-aria-components'
import styles from './Editor.module.css'
import { Button } from '#/shared/ui/Button/Button'
import { createNoteInput } from '#/lib/schemas/notes'

interface EditorProps {
  initialTitle?: string
  initialContent?: string
  isSaving?: boolean
  onSave: (data: { title: string; content: string }) => void
}

export const Editor = ({
  initialTitle = '',
  initialContent = '',
  isSaving = false,
  onSave,
}: EditorProps) => {
  const [title, setTitle] = useState(initialTitle)
  const [value, setValue] = useState<string | undefined>(initialContent)
  const [error, setError] = useState<string | null>(null)

  const handleSave = () => {
    const parsed = createNoteInput.safeParse({
      title,
      content: value ?? '',
    })
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Invalid input')
      return
    }
    setError(null)
    onSave(parsed.data)
  }

  return (
    <div className={styles.editor}>
      <TextField
        value={title}
        onChange={setTitle}
        isInvalid={error !== null && title.trim().length === 0}
        isRequired
      >
        <Label>Title</Label>
        <Input placeholder="Untitled note" />
        <FieldError />
      </TextField>

      <MDEditor
        value={value}
        onChange={setValue}
        preview="live"
        height={400}
      />

      {error && <p role="alert">{error}</p>}

      <div className={styles.buttonContainer}>
        <Button
          variant="primary"
          isPending={isSaving}
          isDisabled={isSaving}
          onPress={handleSave}
        >
          Save Post
        </Button>
      </div>
    </div>
  )
}
