import jwt from 'jsonwebtoken'

const verifyRefreshToken = (refreshToken, refreshSecret) =>
  jwt.verify(refreshToken, refreshSecret)

export default verifyRefreshToken
