import { createServerFn } from '@tanstack/react-start'
import { auth } from 'node_modules/@clerk/tanstack-react-start/dist/server/auth'
import { db } from '~/db'
import { usersTable } from '~/schema'
import { eq } from 'drizzle-orm'

/**
 * Fetches the current authenticated user's information from the database
 *
 * @returns {Promise<{user: SelectUser | null, error?: string}>}
 *   - Returns the user object if found
 *   - Returns null if user is not authenticated or not found in database
 *   - Returns an error message if something goes wrong
 */
export const getUser = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    // Authenticate the current user
    const { isAuthenticated, userId } = await auth()

    // Return early if user is not authenticated
    if (!isAuthenticated || !userId) {
      return { user: null, error: 'Not authenticated' }
    }

    // Fetch user from database
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkId, userId))
      .limit(1)

    // Return the user or null if not found
    return { user: users.length > 0 ? users[0] : null }
  } catch (error) {
    console.error('Error fetching user:', error)
    return { user: null, error: 'Failed to fetch user' }
  }
})
