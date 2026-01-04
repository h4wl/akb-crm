import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { getServerRoute, deleteServerRoute } from '~/server/routes'

export const Route = createFileRoute('/routes/$routeId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const route = await getServerRoute({ data: { id: params.routeId } })
    return { route }
  },
})

function RouteComponent() {
  const { route } = Route.useLoaderData()
  const navigate = useNavigate()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteServerRoute({ data: { id: route.id } })
      navigate({ to: '/routes' })
    } catch (error) {
      console.error('Failed to delete route:', error)
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

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
          <Link
            to="/routes/$routeId/edit"
            params={{ routeId: route.id }}
            className="px-6 py-3 rounded-xl bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 font-bold uppercase tracking-wide border-2 border-stone-200 dark:border-stone-600 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm transition-all"
          >
            Edit Route
          </Link>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="px-6 py-3 rounded-xl bg-red-600 dark:bg-red-700 text-white font-bold uppercase tracking-wide shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:bg-red-700 dark:hover:bg-red-800 active:translate-y-0 active:shadow-sm transition-all"
          >
            Delete Route
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
            <div className="min-w-35 text-xs font-bold uppercase text-stone-500 dark:text-stone-400 pt-1 tracking-wide">
              Route ID
            </div>
            <div className="flex-1 text-stone-800 dark:text-stone-100 font-mono text-sm">
              {route.id}
            </div>
          </div>

          <div className="flex pb-5 border-b border-stone-200 dark:border-stone-700">
            <div className="min-w-35 text-xs font-bold uppercase text-stone-500 dark:text-stone-400 pt-1 tracking-wide">
              Description
            </div>
            <div className="flex-1 text-stone-800 dark:text-stone-100">
              {route.description}
            </div>
          </div>

          <div className="flex pb-5 border-b border-stone-200 dark:border-stone-700">
            <div className="min-w-35 text-xs font-bold uppercase text-stone-500 dark:text-stone-400 pt-1 tracking-wide">
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
            <div className="min-w-35 text-xs font-bold uppercase text-stone-500 dark:text-stone-400 pt-1 tracking-wide">
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

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => !isDeleting && setShowDeleteDialog(false)}
          />

          {/* Dialog */}
          <div className="relative bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-extrabold text-stone-800 dark:text-stone-100 mb-2">
              Delete Route?
            </h3>
            <p className="text-stone-600 dark:text-stone-400 mb-6">
              Are you sure you want to delete{' '}
              <span className="font-bold text-stone-800 dark:text-stone-100">
                {route.routeName}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteDialog(false)}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-700 text-stone-800 dark:text-stone-100 font-bold uppercase tracking-wide hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold uppercase tracking-wide hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
