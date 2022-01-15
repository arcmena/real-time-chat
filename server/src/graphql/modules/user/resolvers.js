import generateHashPassword from '../../../auth/generateHashPassword'

const resolvers = {
  Mutation: {
    createUser: async (_parent, args, context) => {
      const { username, password } = args.data

      const hashcode = await generateHashPassword(password)

      return context.prisma.user.create({
        data: { username, password: hashcode }
      })
    }
  }
}

export default resolvers
