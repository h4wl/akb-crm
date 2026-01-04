import { auth } from '@clerk/tanstack-react-start/server'
import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { db } from '~/db'
import { routesTable } from '~/schema'
import { getUser } from './getUser'
import { eq } from 'drizzle-orm'

const CreateRouteSchema = z.object({
  routeName: z.string().min(1),
  description: z.string().min(1),
})

/**
 * Helper function to get authenticated user and handle errors
 * @throws {Error} If user is not found or getUser returns an error
 */
async function getAuthenticatedUser() {
  const user = await getUser()

  if (user.error) {
    throw new Error(user.error)
  }

  if (!user.user?.id) {
    throw new Error('User not found')
  }

  return user.user
}

export const createServerRoute = createServerFn({ method: 'POST' })
  .inputValidator(CreateRouteSchema)
  .handler(async ({ data }) => {
    const { isAuthenticated, userId } = await auth()

    // Return early if user is not authenticated
    if (!isAuthenticated || !userId) {
      return { success: false, error: 'Not authenticated' }
    }

    const user = await getAuthenticatedUser()

    const route = await db
      .insert(routesTable)
      .values({
        routeName: data.routeName,
        description: data.description,
        userId: user.id,
      })
      .returning({ id: routesTable.id })

    if (!route || route.length === 0 || !route[0]?.id) {
      throw new Error('Failed to create route')
    }
    const createdRouteId = route[0].id

    console.log(`Created route with ID: ${createdRouteId}`)

    throw redirect({
      to: '/routes/$routeId',
      params: { routeId: createdRouteId },
    })
  })

export const getServerRoute = createServerFn({ method: 'GET' })
  .inputValidator(
    z.object({
      id: z.string().min(5),
    }),
  )
  .handler(async ({ data }) => {
    const { isAuthenticated } = await auth()

    // Return early if user is not authenticated
    if (!isAuthenticated) {
      throw new Error('User not authenticated')
    }

    const user = await getAuthenticatedUser()

    const route = await db
      .select()
      .from(routesTable)
      .where(eq(routesTable.id, data.id))
      .limit(1)
      .then((rows) => rows[0])

    if (!route) {
      throw new Error('Route not found')
    }

    // Verify that the route belongs to the authenticated user
    if (route.userId !== user.id) {
      throw new Error('Not authorized to access this route')
    }

    return route
  })

export const getServerRoutes = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { isAuthenticated } = await auth()

    // Return early if user is not authenticated
    if (!isAuthenticated) {
      throw new Error('User not authenticated')
    }

    const user = await getAuthenticatedUser()

    const routes = await db
      .select()
      .from(routesTable)
      .where(eq(routesTable.userId, user.id))

    return routes
  },
)

export const updateServerRoute = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      id: z.string().min(5),
      routeName: z.string().min(1),
      description: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const { isAuthenticated } = await auth()

    if (!isAuthenticated) {
      throw new Error('User not authenticated')
    }

    const user = await getAuthenticatedUser()

    // First verify the route exists and belongs to the user
    const route = await db
      .select()
      .from(routesTable)
      .where(eq(routesTable.id, data.id))
      .limit(1)
      .then((rows) => rows[0])

    if (!route) {
      throw new Error('Route not found')
    }

    if (route.userId !== user.id) {
      throw new Error('Not authorized to update this route')
    }

    // Update the route
    await db
      .update(routesTable)
      .set({
        routeName: data.routeName,
        description: data.description,
        updatedAt: new Date(),
      })
      .where(eq(routesTable.id, data.id))

    throw redirect({
      to: '/routes/$routeId',
      params: { routeId: data.id },
    })
  })

export const deleteServerRoute = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      id: z.string().min(5),
    }),
  )
  .handler(async ({ data }) => {
    const { isAuthenticated } = await auth()

    if (!isAuthenticated) {
      throw new Error('User not authenticated')
    }

    const user = await getAuthenticatedUser()

    // First verify the route exists and belongs to the user
    const route = await db
      .select()
      .from(routesTable)
      .where(eq(routesTable.id, data.id))
      .limit(1)
      .then((rows) => rows[0])

    if (!route) {
      throw new Error('Route not found')
    }

    if (route.userId !== user.id) {
      throw new Error('Not authorized to delete this route')
    }

    // Delete the route
    await db.delete(routesTable).where(eq(routesTable.id, data.id))

    return { success: true }
  })
