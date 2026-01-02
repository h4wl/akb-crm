import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { createServerRoute } from '~/server/routes'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'

export const Route = createFileRoute('/routes/new')({
  component: RouteComponent,
})

function RouteComponent() {
  const [error, setError] = useState<string | null>(null)
  const DEFAULT_ERROR_MESSAGE = 'An unexpected error occurred while creating the route'

  const createRoute = useServerFn(createServerRoute)
  const form = useForm({
    defaultValues: {
      routeName: '',
      description: '',
    },
    onSubmit: async ({ value }) => {
      try {
        setError(null)
        const payload = {
          routeName: value.routeName.trim(),
          description: value.description.trim(),
        }

        await createRoute({data: payload})
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : DEFAULT_ERROR_MESSAGE
        setError(errorMessage)
      }
    },
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="mt-2 text-3xl font-bold text-gray-900">New Route</h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the details for a new route. Submitting will create the route and take you to its details page.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          {error && (
            <div className="mb-6 rounded-md bg-rose-50 border border-rose-200 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-rose-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-rose-800">Error creating route</h3>
                  <div className="mt-2 text-sm text-rose-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <form
            className="space-y-6"
            onSubmit={(event) => {
              event.preventDefault()
              void form.handleSubmit()
            }}
          >
            <form.Field
              name="routeName"
              validators={{
                onChange: ({ value }) => (!value.trim() ? 'Route name is required' : undefined),
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="routeName" className="text-sm font-medium text-gray-800">
                    Route name
                  </label>
                  <input
                    id="routeName"
                    name="routeName"
                    type="text"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200"
                    placeholder="Northside Wednesday route"
                  />
                  {/* {field.state.meta.touchedErrors ? (
                    <p className="text-sm text-rose-700">{field.state.meta.touchedErrors}</p>
                  ) : null} */}
                </div>
              )}
            </form.Field>

            <form.Field
              name="description"
              validators={{
                onChange: ({ value }) => (!value.trim() ? 'Description is required' : undefined),
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium text-gray-800">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200"
                    placeholder="List the stops, cadence, or goal for this route"
                    rows={4}
                  />
                  {/* {field.state.meta.touchedErrors ? (
                    <p className="text-sm text-rose-700">{field.state.meta.touchedErrors}</p>
                  ) : null} */}
                </div>
              )}
            </form.Field>

            <form.Subscribe selector={(state) => state.isSubmitting || state.canSubmit === false}>
              {(isBusy) => (
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    className="text-sm font-medium text-gray-600 hover:text-gray-800"
                    onClick={() => form.reset()}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={isBusy}
                    className="inline-flex items-center rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isBusy ? 'Creating...' : 'Create route'}
                  </button>
                </div>
              )}
            </form.Subscribe>
          </form>
        </div>
      </div>
    </div>
  )
}
