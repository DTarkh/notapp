import { createFileRoute } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import MDEditor from '@uiw/react-md-editor'
import { getPublicNote } from '#/lib/server'
import styles from './PublicNote.module.css'

const publicNoteQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ['public-note', slug],
    queryFn: () => getPublicNote({ data: { slug } }),
  })

export const Route = createFileRoute('/s/$slug/')({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(publicNoteQueryOptions(params.slug)),
  component: PublicNote,
  errorComponent: () => (
    <div className={styles.notFound}>
      <h1>Not found</h1>
      <p>This note is unavailable.</p>
    </div>
  ),
})

function PublicNote() {
  const { slug } = Route.useParams()
  const { data } = useSuspenseQuery(publicNoteQueryOptions(slug))
  return (
    <article className={styles.public}>
      <h1 className={styles.title}>{data.title}</h1>
      <MDEditor.Markdown source={data.content} />
    </article>
  )
}
