import bcrypt from 'bcrypt'

const compareHashPassword = (plainPassword, hashedPassword) =>
  bcrypt.compare(plainPassword, hashedPassword)

export default compareHashPassword
