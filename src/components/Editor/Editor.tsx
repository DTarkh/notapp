import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import styles from './Editor.module.css'
import { Button } from '#/shared/ui/Button/Button'

export const Editor = () => {
  const [value, setValue] = useState<string | undefined>('**Hello world!!!**')
  return (
    <div className={styles.editor}>
      <MDEditor
        value={value}
        onChange={setValue}
        preview="live" // Options: 'live', 'edit', 'preview'
        height={400}
      />

      {/* This is where you'd later hook in your CRUD Save button */}
      <div className={styles.buttonContainer}>
        <Button
          variant="primary"
          onClick={() => console.log('Saving to DB:', value)}
        >
          Save Post
        </Button>
      </div>
    </div>
  )
}
