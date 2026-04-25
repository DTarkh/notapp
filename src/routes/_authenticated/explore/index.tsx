import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { allNotesQueryOptions } from '#/shared/queryOptions/queryOptions'
import { ProgressCircle } from '#/shared/ui/ProgressCircle/ProgressCircle'
import styles from './Explore.module.css'

const toPlain = (markdown: string) =>
  markdown
    .replace(/[-#*_`>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const formatFeedTime = (d: Date | string) => {
  const t = new Date(d)
  return t.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

const authorInitials = (name: string) => {
  const parts = name.trim().split(/\s+/)
  const a = parts[0]?.[0] ?? ''
  const b = parts[1]?.[0] ?? ''
  return (a + b).toUpperCase() || '?'
}

export const Route = createFileRoute('/_authenticated/explore/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: notes, isPending } = useQuery(allNotesQueryOptions())

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.pageHeader}>
          <h1>Explore</h1>
          <p className={styles.sub}>
            Public notes from everyone — similar to a social feed.
          </p>
        </header>

        {isPending && (
          <div className={styles.pending}>
            <ProgressCircle isIndeterminate size={28} />
          </div>
        )}

        {!isPending && notes?.length === 0 && (
          <p className={styles.empty}>No public notes yet.</p>
        )}

        {!isPending && notes && notes.length > 0 && (
          <ul className={styles.feed}>
            {notes.map((item) => {
              const preview = toPlain(item.content)
              return (
                <li key={item.id} className={styles.post}>
                  <div className={styles.postInner}>
                    <div className={styles.avatar} aria-hidden>
                      {item.author.image ? (
                        <img src={item.author.image} alt="" />
                      ) : (
                        authorInitials(item.author.name)
                      )}
                    </div>
                    <div className={styles.postBody}>
                      <div className={styles.postHeader}>
                        <div className={styles.byline}>
                          <span className={styles.authorName}>
                            {item.author.name}
                          </span>
                          <span className={styles.meta} title={item.author.email}>
                            {item.author.email}
                          </span>
                        </div>
                        <time
                          className={styles.time}
                          dateTime={
                            item.createdAt instanceof Date
                              ? item.createdAt.toISOString()
                              : String(item.createdAt)
                          }
                        >
                          {formatFeedTime(item.createdAt)}
                        </time>
                      </div>
                      <h2 className={styles.postTitle}>{item.title}</h2>
                      {preview ? (
                        <p className={styles.preview}>{preview}</p>
                      ) : null}
                      {item.publicSlug ? (
                        <div className={styles.actions}>
                          <Link
                            to="/s/$slug"
                            params={{ slug: item.publicSlug }}
                            className={styles.readLink}
                          >
                            View public page
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
