const resolvers = {
  Mutation: {
    createUser: (_parent, args, context) => {
      const { username, password } = args.data
      
      return context.prisma.user.create({ data: { username, password } })
    }
  },
}

export default resolvers
