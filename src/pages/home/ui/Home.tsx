import {  useRouter } from '@tanstack/react-router'
import { useQuery} from '@tanstack/react-query'
import { notesListQueryOptions } from '#/shared/queryOptions/queryOptions'
import { NoteCard } from '#/components/NoteCard/NoteCard'
import styles from './Home.module.css'
import { Button } from '#/shared/ui/Button/Button'
import { ProgressCircle } from '#/shared/ui/ProgressCircle/ProgressCircle'

export const HomePage = () => {
  const { data: notes, isPending } = useQuery(notesListQueryOptions())
  const router = useRouter()
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1 className={styles.title}>Your notes</h1>
        <Button
          variant="secondary"
          onPress={() => router.navigate({ to: '/notes/new' })}
        >
          + New note
        </Button>
      </header>
    {isPending && <ProgressCircle isIndeterminate size={24}/>}
      {notes?.length === 0 ? (
        <p className={styles.empty}>No notes yet. Create your first one.</p>
      ) : (
        <ul className={styles.list}>
          {notes?.map((n) => (
            <li key={n.id}>
              <NoteCard note={n} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
