import { createFileRoute } from '@tanstack/react-router'
import { Editor } from '#/components/Editor/Editor'

export const Route = createFileRoute('/notes/new/')({
  component: Editor,
})
