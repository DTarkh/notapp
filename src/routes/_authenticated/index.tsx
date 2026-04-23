import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '#/pages/home/ui/Home'



export const Route = createFileRoute('/_authenticated/')({
 
  component: HomePage,
})
