import { auth } from '@clerk/tanstack-react-start/server'
import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const CreateRouteSchema = z.object({
    routeName: z.string().min(1),
    description: z.string().min(1),
})

export const createRoute = createServerFn({ method: 'POST' })
    .inputValidator(CreateRouteSchema)
    .handler(async ({ data }) => {
        const { isAuthenticated, userId } = await auth()

        // Return early if user is not authenticated
        if (!isAuthenticated || !userId) {
            return { success: false, error: 'Not authenticated' }
        }

        console.log('Creating route with data:', data)

        throw redirect({ to: '/routes' })

        //return `Created routeName: ${data.routeName}, description ${data.description}, for userId: ${userId}`
    })