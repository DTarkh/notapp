import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Header } from '#/components/Header/Header'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
