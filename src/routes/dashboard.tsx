import { createFileRoute, redirect } from '@tanstack/react-router'
import { getUser } from '~/server/getUser'
import type { SelectUser } from '~/schema'

/**
 * Dashboard route loader
 * Authenticates the user and fetches their information
 */
export const Route = createFileRoute('/dashboard')({
  loader: async () => {
    const { user, error } = await getUser()

    // Redirect to /init if user not found in database
    if (!user || error) {
      throw redirect({
        to: '/',
      })
    }

    return { user }
  },
  component: DashboardPage,
})

/**
 * DashboardPage component
 * Displays the authenticated user's information from the database
 */
function DashboardPage() {
  const { user } = Route.useLoaderData() as { user: SelectUser }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              User Information
            </h2>

            {/* User Details Card */}
            <div className="space-y-4">
              <div className="flex items-start justify-between py-4 border-b border-gray-200">
                <span className="font-medium text-gray-700">Full Name:</span>
                <span className="text-gray-900">{user.name}</span>
              </div>

              <div className="flex items-start justify-between py-4 border-b border-gray-200">
                <span className="font-medium text-gray-700">First Name:</span>
                <span className="text-gray-900">{user.firstName}</span>
              </div>

              <div className="flex items-start justify-between py-4 border-b border-gray-200">
                <span className="font-medium text-gray-700">Last Name:</span>
                <span className="text-gray-900">{user.lastName}</span>
              </div>

              <div className="flex items-start justify-between py-4 border-b border-gray-200">
                <span className="font-medium text-gray-700">Email:</span>
                <span className="text-gray-900">{user.email}</span>
              </div>

              <div className="flex items-start justify-between py-4 border-b border-gray-200">
                <span className="font-medium text-gray-700">User ID:</span>
                <span className="text-gray-600 text-sm font-mono">
                  {user.clerkId}
                </span>
              </div>

              <div className="flex items-start justify-between py-4 border-b border-gray-200">
                <span className="font-medium text-gray-700">Created:</span>
                <span className="text-gray-900">
                  {formatDate(user.createdAt)}
                </span>
              </div>

              {user.updatedAt && (
                <div className="flex items-start justify-between py-4">
                  <span className="font-medium text-gray-700">
                    Last Updated:
                  </span>
                  <span className="text-gray-900">
                    {formatDate(user.updatedAt)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
