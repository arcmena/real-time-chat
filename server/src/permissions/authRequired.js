import { AuthenticationError } from 'apollo-server-express'

export const requiresAuth = next => (payload, args, context, info) => {
  const { user } = context

  if (!user || !user.id) {
    throw new AuthenticationError('Not authenticated')
  }

  return next(payload, args, context, info)
}
