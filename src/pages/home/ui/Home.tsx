import { useRouter } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { notesListQueryOptions } from '#/shared/queryOptions/queryOptions'
import { NoteCard } from '#/components/NoteCard/NoteCard'
import styles from './Home.module.css'
import { Button } from '#/shared/ui/Button/Button'
import { ProgressCircle } from '#/shared/ui/ProgressCircle/ProgressCircle'
import { Ellipsis, FilePenLine } from 'lucide-react'
import { useState } from 'react'

export const HomePage = () => {
  const { data: notes, isPending } = useQuery(notesListQueryOptions())
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  return (
    <div className={styles.home}>
      <div className={styles.firstColumn}>
        <header>
          <h1>Your notes</h1>
          <Button
            variant="accent"
            onPress={() => router.navigate({ to: '/notes/new' })}
            className={styles.btn}
          >
            <FilePenLine size={18} />
            New note
          </Button>
        </header>
        {isPending && <ProgressCircle isIndeterminate size={24} />}
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

      {isOpen && (
        <div className={styles.secondColumn}>
          <header>
            <h1>Users Dashboard</h1>
          </header>
          <div className={styles.usersDashboard}>dawdaw</div>
        </div>
      )}
      <Button onPress={() => setIsOpen(!isOpen)}>
        <Ellipsis size={18} />
      </Button>
    </div>
  )
}
