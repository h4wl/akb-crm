import { auth, clerkClient, EmailAddress } from '@clerk/tanstack-react-start/server'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/init')({
  loader: async () => {
 
    const { isAuthenticated, userId,  } = await auth()

    if (!isAuthenticated || !userId) {
      throw redirect({
        to: '/',
      })  
    }
    console.log(userId);

    const user = await clerkClient().users.getUser(userId)

    const {firstName, lastName, fullName, primaryEmailAddress} = user;

    throw redirect({
      to: '/',
    })
  },
})