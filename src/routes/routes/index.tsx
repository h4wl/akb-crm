import { createFileRoute, Link } from '@tanstack/react-router'
import { getServerRoutes } from '~/server/routes'

export const Route = createFileRoute('/routes/')({
  component: Routes,
  loader: async () => {
    const routes = await getServerRoutes()
    return { routes }
  },
})

function Routes() {
  const { routes } = Route.useLoaderData()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-stone-800 dark:text-stone-100">
          All Routes
        </h1>
        <Link
          to="/routes/new"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-burgundy to-malt text-white font-bold uppercase tracking-wide shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm transition-all"
        >
          + Add Route
        </Link>
      </div>

      {routes.length === 0 ? (
        <div className="bg-white dark:bg-stone-800 rounded-3xl p-12 shadow-md text-center">
          <div className="text-6xl mb-4 opacity-50">📋</div>
          <p className="text-lg font-semibold text-stone-500 dark:text-stone-400">
            No routes found. Create your first route to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {routes.map((route) => (
            <Link
              key={route.id}
              to="/routes/$routeId"
              params={{ routeId: route.id }}
              className="block bg-white dark:bg-stone-800 rounded-2xl p-5 shadow-md border-l-4 border-amber cursor-pointer hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg active:shadow-sm transition-all"
            >
              <div className="font-bold text-lg mb-1 text-stone-800 dark:text-stone-100">
                {route.routeName}
              </div>
              <div className="text-sm text-stone-500 dark:text-stone-400 mb-2">
                {route.description}
              </div>
              <div className="flex gap-4 text-xs text-stone-500 dark:text-stone-400 pt-3 mt-3 border-t border-stone-200 dark:border-stone-700">
                <span className="font-semibold">
                  Created: {new Date(route.createdAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
