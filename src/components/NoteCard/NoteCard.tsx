import { Link } from '@tanstack/react-router'
import type { notes } from '#/db/schema'
import { Button } from '#/shared/ui/Button/Button'
import styles from './NoteCard.module.css'

type Note = typeof notes.$inferSelect

const toPlain = (markdown: string) =>
  markdown
    .replace(/[-#*_`>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

/** M/D and 24h time, stable width on the row (Gmail-style list). */
const formatListDateTime = (d: Date | string) => {
  const t = new Date(d)
  const m = t.getMonth() + 1
  const day = t.getDate()
  const h = t.getHours().toString().padStart(2, '0')
  const min = t.getMinutes().toString().padStart(2, '0')
  return `${m}/${day} ${h}:${min}`
}

export const NoteCard = ({ note }: { note: Note }) => {
  const plain = toPlain(note.content)
  const at = new Date(note.createdAt)
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{note.title}</h2>
      <p className={styles.preview} title={plain || undefined}>
        {plain}
      </p>
      <div className={styles.aside}>
        <time className={styles.date} dateTime={at.toISOString()}>
          {formatListDateTime(note.createdAt)}
        </time>
        <Link to="/notes/$id" params={{ id: note.id }} className={styles.edit}>
          <Button variant="tertiary" className={styles.viewBtn}>
            View
          </Button>
        </Link>
      </div>
    </article>
  )
}
