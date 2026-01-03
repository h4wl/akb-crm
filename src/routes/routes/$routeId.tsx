import { createFileRoute, Link } from '@tanstack/react-router'
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm font-semibold text-stone-500 dark:text-stone-400">
        <Link to="/routes" className="text-burgundy font-bold hover:underline">
          All Routes
        </Link>{' '}
        / {route.routeName}
      </div>

      {/* Page Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <h1 className="text-5xl font-extrabold tracking-tight mb-2 text-stone-800 dark:text-stone-100">
            {route.routeName}
          </h1>
          <p className="text-lg font-semibold text-stone-500 dark:text-stone-400">
            {route.description}
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-xl bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 font-bold uppercase tracking-wide border-2 border-stone-200 dark:border-stone-600 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm transition-all">
            Edit Route
          </button>
        </div>
      </div>

      {/* Route Details Card */}
      <div className="bg-white dark:bg-stone-800 rounded-3xl p-7 shadow-md">
        <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-stone-200 dark:border-stone-700">
          <h2 className="text-xl font-extrabold text-stone-800 dark:text-stone-100">
            Route Details
          </h2>
        </div>

        <div className="space-y-5">
          <div className="flex pb-5 border-b border-stone-200 dark:border-stone-700">
            <div className="min-w-[140px] text-xs font-bold uppercase text-stone-500 dark:text-stone-400 pt-1 tracking-wide">
              Route ID
            </div>
            <div className="flex-1 text-stone-800 dark:text-stone-100 font-mono text-sm">
              {route.id}
            </div>
          </div>

          <div className="flex pb-5 border-b border-stone-200 dark:border-stone-700">
            <div className="min-w-[140px] text-xs font-bold uppercase text-stone-500 dark:text-stone-400 pt-1 tracking-wide">
              Description
            </div>
            <div className="flex-1 text-stone-800 dark:text-stone-100">
              {route.description}
            </div>
          </div>

          <div className="flex pb-5 border-b border-stone-200 dark:border-stone-700">
            <div className="min-w-[140px] text-xs font-bold uppercase text-stone-500 dark:text-stone-400 pt-1 tracking-wide">
              Created
            </div>
            <div className="flex-1 text-stone-800 dark:text-stone-100">
              {new Date(route.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>

          <div className="flex">
            <div className="min-w-[140px] text-xs font-bold uppercase text-stone-500 dark:text-stone-400 pt-1 tracking-wide">
              Last Updated
            </div>
            <div className="flex-1 text-stone-800 dark:text-stone-100">
              {new Date(route.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
