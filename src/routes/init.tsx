import { createFileRoute, redirect } from '@tanstack/react-router'
import { createUser } from '~/server/createUser'

export const Route = createFileRoute('/init')({
  loader: async () => {
    const result = await createUser()

    if (result.success) {
      throw redirect({
        to: '/dashboard',
      })
    } else {
      throw redirect({
        to: '/error',
      })
    }
  },
})
