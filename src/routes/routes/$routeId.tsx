import { createFileRoute, Outlet } from '@tanstack/react-router'
import { getServerRoute } from '~/server/routes'

export const Route = createFileRoute('/routes/$routeId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const route = await getServerRoute({ data: { id: params.routeId } })
    return { route }
  },
})

function RouteComponent() {
  return <Outlet />
}
