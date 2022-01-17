import compareHashPassword from 'auth/compareHashPassword'
import generateHashPassword from 'auth/generateHashPassword'
import generateAuthToken from 'auth/generateAuthToken'

const resolvers = {
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
