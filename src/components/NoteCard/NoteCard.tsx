import { Link } from '@tanstack/react-router'
import type { notes } from '#/db/schema'
import { Button } from '#/shared/ui/Button/Button'
import styles from './NoteCard.module.css'

type Note = typeof notes.$inferSelect

const preview = (markdown: string, max = 160) => {
  const plain = markdown
    .replace(/[#*_`>\-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return plain.length > max ? plain.slice(0, max) + '…' : plain
}

const formatDate = (d: Date) =>
  new Date(d).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

export const NoteCard = ({ note }: { note: Note }) => (
  <article className={styles.card}>
    <h2 className={styles.title}>{note.title}</h2>
    <p className={styles.preview}>{preview(note.content)}</p>
    <div className={styles.footer}>
      <time className={styles.date}>{formatDate(note.createdAt)}</time>
      <Link to="/notes/$id" params={{ id: note.id }} className={styles.edit}>
        <Button variant="quiet">Edit</Button>
      </Link>
    </div>
  </article>
)
