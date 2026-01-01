import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/routes/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/routes/new"!</div>
}
