import { createFileRoute, Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { getServerRoute, updateServerRoute } from '~/server/routes'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { Form } from '@base-ui/react/form'
import { Button } from '@base-ui/react/button'
import { FormField } from '~/components/FormField'

export const Route = createFileRoute('/routes/$routeId/edit')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const route = await getServerRoute({ data: { id: params.routeId } })
    return { route }
  },
})

function RouteComponent() {
  const { route } = Route.useLoaderData()
  const [error, setError] = useState<string | null>(null)
  const DEFAULT_ERROR_MESSAGE =
    'An unexpected error occurred while updating the route'

  const updateRoute = useServerFn(updateServerRoute)
  const form = useForm({
    defaultValues: {
      routeName: route.routeName,
      description: route.description,
    },
    onSubmit: async ({ value }) => {
      try {
        setError(null)
        const payload = {
          id: route.id,
          routeName: value.routeName.trim(),
          description: value.description.trim(),
        }

        await updateRoute({ data: payload })
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : DEFAULT_ERROR_MESSAGE
        setError(errorMessage)
      }
    },
  })

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm font-semibold text-stone-500 dark:text-stone-400">
        <Link to="/routes" className="text-burgundy font-bold hover:underline">
          All Routes
        </Link>{' '}
        /{' '}
        <Link
          to="/routes/$routeId"
          params={{ routeId: route.id }}
          className="text-burgundy font-bold hover:underline"
        >
          {route.routeName}
        </Link>{' '}
        / Edit
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-stone-800 dark:text-stone-100">
          Edit Route
        </h1>
        <p className="mt-2 text-lg font-semibold text-stone-500 dark:text-stone-400">
          Update the details for this route.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-stone-800 rounded-3xl p-7 shadow-md">
        {error && (
          <div className="mb-6 rounded-2xl bg-burgundy/10 border-2 border-burgundy/20 p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">!</span>
              <div>
                <h3 className="text-sm font-bold text-burgundy">
                  Error updating route
                </h3>
                <p className="mt-1 text-sm text-burgundy/80">{error}</p>
              </div>
            </div>
          </div>
        )}

        <Form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault()
            void form.handleSubmit()
          }}
        >
          <form.Field
            name="routeName"
            validators={{
              onChange: ({ value }) =>
                !value.trim() ? 'Route name is required' : undefined,
            }}
          >
            {(field) => (
              <FormField
                field={field}
                label="Route Name"
                placeholder="e.g. Northside Wednesday"
              />
            )}
          </form.Field>

          <form.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                !value.trim() ? 'Description is required' : undefined,
            }}
          >
            {(field) => (
              <FormField
                field={field}
                label="Description"
                placeholder="List the stops, cadence, or goal for this route"
              />
            )}
          </form.Field>

          <form.Subscribe
            selector={(state) =>
              state.isSubmitting || state.canSubmit === false
            }
          >
            {(isBusy) => (
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-stone-200 dark:border-stone-700">
                <Link
                  to="/routes/$routeId"
                  params={{ routeId: route.id }}
                  className="px-6 py-3 rounded-xl bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 font-bold uppercase tracking-wide border-2 border-stone-200 dark:border-stone-600 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm transition-all"
                >
                  Cancel
                </Link>
                <Button
                  type="submit"
                  disabled={isBusy}
                  className="px-6 py-3 rounded-xl bg-linear-to-r from-burgundy to-malt text-white font-bold uppercase tracking-wide shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Save Changes
                </Button>
              </div>
            )}
          </form.Subscribe>
        </Form>
      </div>
    </div>
  )
}
