import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/routes/$routeId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { routeId } = Route.useParams()
  return <div>Hello "/routes/{routeId}"!</div>
}
