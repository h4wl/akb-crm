/**
 * Server function to create or sync a user in the database from Clerk authentication.
 * This module handles user creation by fetching user data from Clerk and storing it in the local database.
 */

import { EmailAddress } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import { clerkClient } from "@clerk/tanstack-react-start/server";
import { db } from "~/db";
import { usersTable } from "~/schema";
import { eq } from 'drizzle-orm'

/**
 * Creates or syncs a user in the database.
 * 
 * This server function performs the following steps:
 * 1. Authenticates the user using Clerk
 * 2. Fetches user details from Clerk
 * 3. Checks if the user already exists in the database
 * 4. Creates a new user record or updates existing user with latest Clerk data
 * 
 * @returns {Promise<{success: boolean, message: string}>} Operation result
 * - {success: false, message: "Not authenticated"} if user is not authenticated
 * - {success: true, message: "User created"} if new user was created
 * - {success: true, message: "User updated"} if existing user was synced
 * - {success: false, message: "Error message"} if an error occurred
 * 
 * @example
 * const result = await createUser();
 * if (result.success) {
 *   console.log(result.message);
 * }
 */
export const createUser = createServerFn({ method: 'POST' })
  .handler(async () => {
    try {
      // Authenticate the current user and get their Clerk user ID
      const { isAuthenticated, userId } = await auth()

      // Return early if user is not authenticated
      if (!isAuthenticated || !userId) {
        return { success: false, message: 'Not authenticated' }
      }

      // Fetch user details from Clerk
      const clerkUser = await clerkClient().users.getUser(userId)

      // Extract relevant user information with fallbacks
      const firstName = clerkUser.firstName || ''
      const lastName = clerkUser.lastName || ''
      const fullName = clerkUser.fullName || `${firstName} ${lastName}`.trim()
      const email = (clerkUser.primaryEmailAddress as EmailAddress)?.emailAddress

      // Validate that we have at least an email
      if (!email) {
        return { success: false, message: 'User has no primary email address' }
      }

      // Check if user already exists in the database
      const existingUsers = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.userId, userId))
        .limit(1)

      const existingUser = existingUsers[0]

      // If user exists, update their information
      if (existingUser) {
        await db
          .update(usersTable)
          .set({
            email,
            name: fullName,
            firstName,
            lastName,
            updatedAt: new Date(),
          })
          .where(eq(usersTable.userId, userId))

        return { success: true, message: 'User updated' }
      }

      // If user doesn't exist, create a new record
      await db
        .insert(usersTable)
        .values({
          userId,
          email,
          name: fullName,
          firstName,
          lastName,
        })

      return { success: true, message: 'User created' }
    } catch (error) {
      console.error('Error in createUser:', error)
      return { success: false, message: 'Failed to create or update user' }
    }
  })