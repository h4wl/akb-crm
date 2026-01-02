import { createFileRoute } from '@tanstack/react-router'
import { getServerRoute } from '~/server/routes'

export const Route = createFileRoute('/routes/$routeId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const route = await getServerRoute({ data: { id: params.routeId } })
    return { route }
  },
})

function RouteComponent() {
  const { route } = Route.useLoaderData()

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{route.routeName}</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <p className="text-gray-900">{route.description}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Route ID
          </label>
          <p className="text-gray-900">{route.id}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User ID
          </label>
          <p className="text-gray-900">{route.userId}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Created At
          </label>
          <p className="text-gray-900">
            {new Date(route.createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Updated At
          </label>
          <p className="text-gray-900">
            {new Date(route.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
