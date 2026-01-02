import { createFileRoute } from '@tanstack/react-router'

/**
 * Error route component
 * Displays a generic error message page for error handling
 */
export const Route = createFileRoute('/error')({
  component: ErrorPage,
})

/**
 * ErrorPage component
 * Shows a user-friendly error message and navigation options
 */
function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-700 text-lg mb-6">
          Something went wrong. Please try again later or contact support if the
          problem persists.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  )
}
