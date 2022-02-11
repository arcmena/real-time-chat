export const getOtherUser = (id, users) => users.find(user => user.id !== id)
