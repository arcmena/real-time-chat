export const containUser = (userId, users) =>
  !!users.find(({ id }) => id === userId)
