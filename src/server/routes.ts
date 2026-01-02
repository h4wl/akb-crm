import { auth } from '@clerk/tanstack-react-start/server'
import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { db } from '~/db'
import { routesTable } from '~/schema'
import { getUser } from './getUser'

const CreateRouteSchema = z.object({
    routeName: z.string().min(1),
    description: z.string().min(1),
})

export const createServerRoute = createServerFn({ method: 'POST' })
    .inputValidator(CreateRouteSchema)
    .handler(async ({ data }) => {
        const { isAuthenticated, userId } = await auth()

        // Return early if user is not authenticated
        if (!isAuthenticated || !userId) {
            return { success: false, error: 'Not authenticated' }
        }

        const user = await getUser();

        var route = await db
            .insert(routesTable)
            .values({
                routeName: data.routeName,
                description: data.description,
                userId: user.user?.id!,
            })
            .returning({ id: routesTable.id });

        var createdRouteId = route[0].id;

        console.log(`Created route with ID: ${createdRouteId}`)
        
        throw redirect({ 
            to: '/routes/$routeId',
            params: { routeId: createdRouteId }
        })

        //return `Created routeName: ${data.routeName}, description ${data.description}, for userId: ${userId}`
    })