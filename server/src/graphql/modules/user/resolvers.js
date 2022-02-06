import compareHashPassword from 'auth/compareHashPassword'
import generateHashPassword from 'auth/generateHashPassword'
import generateAuthToken from 'auth/generateAuthToken'

import authRequired from 'permissions/authRequired'

const resolvers = {
  Query: {
    me: authRequired(async (_parent, _args, context) => {
      const { prisma, user } = context

      const userInfo = await prisma.user.findUnique({
        where: { id: user.id }
      })

      return userInfo
    })
  },
  Mutation: {
    login: async (_parent, args, context) => {
      const { username, password } = args.data
      const { prisma } = context

      const user = await prisma.user.findUnique({
        where: {
          username
        }
      })

      if (!user) {
        return {
          errors: [{ path: 'username', message: 'Wrong Username' }]
        }
      }

      const validPassword = await compareHashPassword(password, user.password)

      if (!validPassword) {
        return {
          errors: [{ path: 'password', message: 'Wrong Password' }]
        }
      }

      const token = generateAuthToken(user)

      return {
        token
      }
    },
    createUser: async (_parent, args, context) => {
      const { username, password } = args.data
      const { prisma } = context

      const hashcode = await generateHashPassword(password)

      return prisma.user.create({
        data: { username, password: hashcode }
      })
    }
  }
}

export default resolvers
