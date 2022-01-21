import { AuthenticationError } from 'apollo-server-express'

const authRequired = next => (payload, args, context, info) => {
  const { user } = context

  if (!user || !user.id) {
    throw new AuthenticationError('Not authenticated')
  }

  return next(payload, args, context, info)
}

export default authRequired
