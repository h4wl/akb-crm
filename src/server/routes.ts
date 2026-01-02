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

export const createServerRoute = createServerFn({ method: 'POST' })
    .inputValidator(CreateRouteSchema)
    .handler(async ({ data }) => {
        const { isAuthenticated, userId } = await auth()

        // Return early if user is not authenticated
        if (!isAuthenticated || !userId) {
            return { success: false, error: 'Not authenticated' }
        }

        const user = await getUser();

        if (user.error) {
            throw new Error(user.error);
        }

        if (!user.user?.id) {
            throw new Error('User not found');
        }

        var route = await db
            .insert(routesTable)
            .values({
                routeName: data.routeName,
                description: data.description,
                userId: user.user.id,
            })
            .returning({ id: routesTable.id });

        if (!route || route.length === 0 || !route[0]?.id) {
            throw new Error('Failed to create route');
        }
        const createdRouteId = route[0].id;

        console.log(`Created route with ID: ${createdRouteId}`)
        
        throw redirect({ 
            to: '/routes/$routeId',
            params: { routeId: createdRouteId }
        })
    });

export const getServerRoute = createServerFn({ method: 'GET' })
    .inputValidator(z.object({
        id: z.string().min(5),
    }))
    .handler(async ({ data }) => {
        const { isAuthenticated } = await auth();

        // Return early if user is not authenticated
        if (!isAuthenticated) {
            throw new Error('User not authenticated');
        }

        const user = await getUser();

        if (user.error) {
            throw new Error(user.error);
        }

        if (!user.user?.id) {
            throw new Error('User not found');
        }

        const route = await db
                .select()
                .from(routesTable)
                .where(eq(routesTable.id, data.id))
                .limit(1)
                .then(rows => rows[0]);

        if (!route) {
            throw new Error('Route not found');
        }

        // Verify that the route belongs to the authenticated user
        if (route.userId !== user.user.id) {
            throw new Error('Not authorized to access this route');
        }

        return route;
    });

export const getServerRoutes = createServerFn({ method: 'GET' })
    .handler(async () => {
        const { isAuthenticated } = await auth();

        // Return early if user is not authenticated
        if (!isAuthenticated) {
            throw new Error('User not authenticated');
        }

        const user = await getUser();

        if (user.error) {
            throw new Error(user.error);
        }

        if (!user.user?.id) {
            throw new Error('User not found');
        }

        const routes = await db
            .select()
            .from(routesTable)
            .where(eq(routesTable.userId, user.user.id));

        return routes;
    });